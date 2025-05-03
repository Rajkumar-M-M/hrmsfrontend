import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { useAuth } from '../../context/authContext';

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [activeTab, setActiveTab] = useState('about');
  const { user } = useAuth();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axiosInstance.get(`/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        alert(error.response?.data?.error || 'Failed to fetch employee.');
      }
    };

    fetchEmployee();
  }, [id]);

  useEffect(() => {
    if (activeTab === 'leave') {
      const fetchLeaves = async () => {
        try {
          const response = await axiosInstance.get(`/leave/${id}/${user.role}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          if (response.data.success) {
            setLeaves(response.data.leaves);
          }
        } catch (error) {
          alert(error.response?.data?.error || 'Failed to fetch leaves.');
        }
      };

      fetchLeaves();
    }
  }, [activeTab, id, user]);

  if (!employee) return <div className="text-center mt-10">Loading...</div>;

  const { userId, employeeId, dob, gender, department, maritalStatus, designation, location } = employee;

  return (
    <div className="container mx-auto p-6 bg-white rounded-md shadow-md mt-10">
      {/* Header */}
      <div className="flex items-center mb-6">
        {userId.profileImage ? (
          <img
            src={`http://localhost:5000/${userId.profileImage}`}
            alt="Profile"
            className="w-16 h-16 rounded-full border"
          />
        ) : (
          <div className="bg-gray-700 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
            {userId.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="ml-4">
          <h1 className="text-xl font-semibold">
            {userId.name?.toUpperCase()} ({employeeId})
          </h1>
          <p className="text-sm">Email: {userId.email}</p>
        </div>
        <button
          onClick={() => navigate(`/admin-dashboard/employees/edit/${employee._id}`)}
          className="ml-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4 z-10 relative bg-white">
        <button
          onClick={() => setActiveTab('about')}
          className={`px-4 py-2 font-semibold focus:outline-none ${
            activeTab === 'about'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          About
        </button>
        <button
          onClick={() => setActiveTab('leave')}
          className={`ml-4 px-4 py-2 font-semibold focus:outline-none ${
            activeTab === 'leave'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          Leave
        </button>
      </div>

      {/* Tab Content Wrapper */}
      <div className="relative z-0">
        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border p-4 rounded-lg bg-gray-50">
              <h2 className="font-semibold mb-2">Personal Information</h2>
              <p><strong>Date of Birth:</strong> {new Date(dob).toDateString()}</p>
              <p><strong>Gender:</strong> {gender}</p>
              <p><strong>Marital Status:</strong> {maritalStatus}</p>
              <p><strong>Location:</strong> {location}</p>
            </div>
            <div className="border p-4 rounded-lg bg-gray-50">
              <h2 className="font-semibold mb-2">Work Information</h2>
              <p><strong>Department:</strong> {department?.dep_name}</p>
              <p><strong>Designation:</strong> {designation}</p>
              <p><strong>Employee ID:</strong> {employeeId}</p>
              <p><strong>Role:</strong> {userId.role}</p>
            </div>
          </div>
        )}

        {/* Leave Tab */}
        {activeTab === 'leave' && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Leave Details</h2>
            {leaves.length === 0 ? (
              <p>No leave records found.</p>
            ) : (
              <table className="w-full border text-sm">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-2 border">Leave Type</th>
                    <th className="p-2 border">Start Date</th>
                    <th className="p-2 border">End Date</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((leave) => (
                    <tr key={leave._id} className="hover:bg-gray-50">
                      <td className="p-2 border">{leave.leaveType}</td>
                      <td className="p-2 border">{new Date(leave.startDate).toLocaleDateString()}</td>
                      <td className="p-2 border">{new Date(leave.endDate).toLocaleDateString()}</td>
                      <td className="p-2 border capitalize">{leave.status}</td>
                      <td className="p-2 border">{leave.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default View;
