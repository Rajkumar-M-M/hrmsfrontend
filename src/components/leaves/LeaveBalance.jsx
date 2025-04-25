import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';

const LeaveBalance = () => {
  const [leaveCounts, setLeaveCounts] = useState({
    "Loss of Pay": 0,
    "Sick Leave": 0,
    "Bereavement Leave": 0,
    "Privilege Leave": 0
  });

  const [year, setYear] = useState(new Date().getFullYear());
  const { user } = useAuth();

  const fetchLeaves = async () => {
    try {
      const response = await axiosInstance.get(`/leave?year=${year}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        groupLeavesByType(response.data.leaves);
      }
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  const groupLeavesByType = (leaves) => {
    const leaveTypeCounts = leaves.reduce((acc, leave) => {
      const leaveType = leave.leaveType;
      acc[leaveType] = (acc[leaveType] || 0) + 1;
      return acc;
    }, {
      "Loss of Pay": 0,
      "Sick Leave": 0,
      "Bereavement Leave": 0,
      "Privilege Leave": 0
    });
    setLeaveCounts(leaveTypeCounts);
  };

  useEffect(() => {
    fetchLeaves();
  }, [year]);

  return (
    <div className='p-10'>
      <div className='flex justify-between items-center mb-6'>
        <h3 className='text-2xl font-bold'>Leave Balances for {year}</h3>
        <div className='flex space-x-4 items-center'>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className='border rounded-md p-2'
          >
            <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
            <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
          </select>
          {user.role === 'employee' && (
            <Link to="/employee-dashboard/add-leave" className='bg-blue-600 text-white py-2 px-4 rounded-lg'>
              Apply
            </Link>
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'>
        {/* Loss of Pay Card */}
        <div className='bg-white border border-gray-300 rounded-lg shadow-lg p-8 text-center'>
          <div className='flex justify-between'>
            <h4 className='text-lg font-semibold mb-2'>Loss of Pay</h4>
            <p className='text-gray-500'>Granted: 0</p>
          </div>
          <div className='text-4xl font-bold mb-4'>{leaveCounts["Loss of Pay"]}</div>
          <p className='text-gray-500'>Balance</p>
          {leaveCounts["Loss of Pay"] > 0 && (
            <Link 
              to={`/employee-dashboard/leavebalance/Loss of Pay/${year}`} 
              className='text-blue-600 font-bold cursor-pointer'
            >
              View Details
            </Link>
          )}
        </div>

        {/* Sick Leave Card */}
        <div className='bg-white border border-gray-300 rounded-lg shadow-lg p-8 text-center'>
          <div className='flex justify-between'>
            <h4 className='text-lg font-semibold mb-2'>Sick Leave</h4>
            <p className='text-gray-500'>Granted: {leaveCounts["Sick Leave"]}</p>
          </div>
          <div className='text-4xl font-bold mb-4'>{leaveCounts["Sick Leave"]}</div>
          <p className='text-gray-500'>Balance</p>
          {leaveCounts["Sick Leave"] > 0 && (
            <Link 
              to={`/employee-dashboard/leavebalance/Sick Leave/${year}`} 
              className='text-blue-600 font-bold cursor-pointer'
            >
              View Details
            </Link>
          )}
        </div>

        {/* Bereavement Leave Card */}
        <div className='bg-white border border-gray-300 rounded-lg shadow-lg p-6 text-center'>
          <div className='flex justify-between'>
            <h4 className='text-lg font-semibold mb-2'>Bereavement Leave</h4>
            <p className='text-gray-500'>Granted: {leaveCounts["Bereavement Leave"]}</p>
          </div>
          <div className='text-4xl font-bold mb-4'>{leaveCounts["Bereavement Leave"]}</div>
          <p className='text-gray-500'>Balance</p>
          {leaveCounts["Bereavement Leave"] > 0 && (
            <Link 
              to={`/employee-dashboard/leavebalance/Bereavement Leave/${year}`} 
              className='text-blue-600 font-bold cursor-pointer'
            >
              View Details
            </Link>
          )}
        </div>

        {/* Privilege Leave Card */}
        <div className='bg-white border border-gray-300 rounded-lg shadow-lg p-6 text-center'>
          <div className='flex justify-between'>
            <h4 className='text-lg font-semibold mb-2'>Privilege Leave</h4>
            <p className='text-gray-500'>Granted: {leaveCounts["Privilege Leave"]}</p>
          </div>
          <div className='text-4xl font-bold mb-4'>{leaveCounts["Privilege Leave"]}</div>
          <p className='text-gray-500'>Balance</p>
          {leaveCounts["Privilege Leave"] > 0 && (
            <Link 
              to={`/employee-dashboard/leavebalance/Privilege Leave/${year}`} 
              className='text-blue-600 font-bold cursor-pointer'
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveBalance;
