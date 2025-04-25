import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBriefcase, FaFileAlt, FaLock } from "react-icons/fa"; // Importing icons
import { FiCamera } from "react-icons/fi";
import upload from "../../assets/upload 01.png";
import axiosInstance from "../../utils/axiosInstance";


const Add = () => {
  const tabs = [
    { label: "Personal Information", icon: <FaUser /> },
    { label: "Professional Information", icon: <FaBriefcase /> },
    { label: "Documents", icon: <FaFileAlt /> },
    { label: "Account Access", icon: <FaLock /> },
  ];
  const [activeTab, setActiveTab] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [image, setimage] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleNext = () => {
    if (activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const handleBack = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      console.log(formDataObj);
      const response = await axiosInstance.post(
        "/employee/add",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto border  bg-white p-6 rounded-lg shadow-lg">
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium ${
              activeTab === index
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* tab content */}
      <div className="mt-4">
        {activeTab === 0 && (
          <div>
            <div className="flex items-center gap-6 mb-2">
              {/* Image */}
              <div className="relative">
                <div className="w-24 h-20 border rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                  {image ? (
                    <img
                      src={image}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiCamera size={32} />
                  )}
                </div>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="absolute inset-0 opacity-0 cursor-pointer "
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/*first name */}
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              {/* last name */}
              <div>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname || ""}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              {/* mobile number */}
              <div>
                <input
                  type="number"
                  name="mobilenumber"
                  value={formData.mobilenumber || ""}
                  onChange={handleChange}
                  placeholder="Mobile Number"
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              {/* email */}
              <div>
                <input
                  type="email"
                  name="personalEmail"
                  value={formData.personalEmail || ""}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              
              {/* date of birth */}
              <div>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob || ""}
                  onChange={handleChange}
                  placeholder="Date of Birth"
                  required
                  className=" mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
              </div>
              {/* marital status */}
              <div>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus || ""}
                  onChange={handleChange}
                  placeholder="marital status"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Marital Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>
              {/* Gender */}
              <div>
                <select
                  name="gender"
                  value={formData.gender || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {/* Nationality */}
              <div>
                <select
                  name="nationality"
                  value={formData.nationality || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Nationality</option>
                  <option value="indian">Indian</option>
                  <option value="japanese">japanese</option>
                  <option value="Chinese">Chinese</option>
                </select>
              </div>

             
              
              {/* location */}
              {/* <div>

                    <input type="text"  name="location" onChange={handleChange} placeholder='Enter Employee Location' required className='mt-1 p-2 block w-full border border-gray-300 rounded-md' />
                </div> */}
              {/* role */}
              {/* <div>
                    <select name="role" onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="employee">Employee</option>
                    </select>
                </div> */}
              {/* password */}
              {/* <div>
                    <input type="password" onChange={handleChange}  name="password" placeholder='Enter Password' required className='mt-1 p-2 block w-full border border-gray-300 rounded-md' />
                </div> */}
            </div>
            {/* address */}
            <div>
              <textarea
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                id=""
                placeholder="Address"
                required
                className="mt-3 p-2 block w-full border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-3 gap-3">
              {/* City */}
              <div>
                <select
                  name="city"
                  value={formData.city || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">City</option>
                  <option value="chennai">Chennai</option>
                  <option value="coimbatore">Coimbatore</option>
                  <option value="erode">Erode</option>
                </select>
              </div>
              {/* state */}
              <div>
                <select
                  name="state"
                  value={formData.state || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">State</option>
                  <option value="tamilnadu">Tamilnadu</option>
                  <option value="kerala">Kerala</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="hydrabad">Hydrabad</option>
                </select>
              </div>
              {/* Zipcode */}
              <div>
                <select
                  name="zipcode"
                  value={formData.zipcode || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Zipcode</option>
                  <option value="600001">600001</option>
                  <option value="600002">600002</option>
                  <option value="600003">600003</option>
                  <option value="600004">600004</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div>
            <div className="grid grid-cols-2 gap-4">
              {/* emp id */}
              <div>
                    <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} placeholder='Insert Emp id' required className='mt-1 p-2 block w-full border border-gray-300 rounded-md' />
                </div>
              <div>
                <input
                  type="text"
                  placeholder="User Name"
                  name="username"
                  onChange={handleChange}
                  value={formData.username || ""}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <select
                className="w-full border rounded-lg px-3 py-2"
                name="employeetype"
                onChange={handleChange}
                value={formData.employeetype || ""}
              >
                <option>Select Employee Type</option>
                <option>Contract</option>
                <option>Employee</option>
              </select>
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  name="professionalEmail"
                  onChange={handleChange}
                  value={formData.professionalEmail || ""}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              {/* Department */}
              <div>
                    <select name="department" value={formData.department || ""} onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                        <option value="">Select Department</option>
                        {departments.map(dep => (
                            <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                        ))}
                    </select>
                </div>
              {/* <select
                className="w-full border rounded-lg px-3 py-2"
                name="department"
                onChange={handleChange}
              >
                <option>Select Department</option>
                <option>It</option>
                <option>Ux</option>
              </select> */}
               {/* Designation */}
               <div>
                    <input type="text"  name="designation" value={formData.designation || ""} onChange={handleChange} placeholder='Designation' required className='mt-1 p-2 block w-full border border-gray-300 rounded-md' />
                </div>
              <select
                className="w-full border rounded-lg px-3 py-2"
                name="workingdays"
              >
                <option>Select Working Days</option>
                <option>10</option>
                <option>20</option>
              </select>
              <div>
                <input
                  type="date"
                  placeholder="Select joining Date"
                  name="joiningdate"
                  value={formData.joiningdate || ""}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>
            <div className="mt-4">
              <select
                className="w-full border rounded-lg px-3 py-2"
                name="officelocation"
                onChange={handleChange}
                value={formData.officelocation || ""}
              >
                <option>Select Office Location</option>
                <option>Chennai</option>
                <option>Coimbatore</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 2 && (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-md">Upload Appointment Letter</label>
              <div className="w-full border rounded-lg px-3 py-2 border-dashed border-indigo-500 flex flex-col items-center mt-3">
                <input
                  type="file"
                  className="hidden"
                  id="appointmentLetter"
                  onChange={(e) => console.log(e.target.files[0])}
                />
                <label htmlFor="appointmentLetter" className="cursor-pointer">
                  <img
                    src={upload}
                    alt="Upload"
                    width={40}
                    className="p-2 bg-indigo-600 rounded-md"
                  />
                </label>
                <h5 className="mt-2 text-gray-600">
                  Drag & Drop or{" "}
                  <span className="text-indigo-500 cursor-pointer">
                    Choose file
                  </span>{" "}
                  to Upload
                </h5>
                <p className="text-gray-400 text-xs mt-1">
                  Supported formats: .jpeg, .pdf
                </p>
              </div>
            </div>
            <div>
              <label className="block text-md">Upload Salary Slips</label>
              <div className="w-full border rounded-lg px-3 py-2 border-dashed border-indigo-500 flex flex-col items-center mt-3">
                <input
                  type="file"
                  className="hidden"
                  id="appointmentLetter"
                  onChange={(e) => console.log(e.target.files[0])}
                />
                <label htmlFor="appointmentLetter" className="cursor-pointer">
                  <img
                    src={upload}
                    alt="Upload"
                    width={40}
                    className="p-2 bg-indigo-600 rounded-md"
                  />
                </label>
                <h5 className="mt-2 text-gray-600">
                  Drag & Drop or{" "}
                  <span className="text-indigo-500 cursor-pointer">
                    Choose file
                  </span>{" "}
                  to Upload
                </h5>
                <p className="text-gray-400 text-xs mt-1">
                  Supported formats: .jpeg, .pdf
                </p>
              </div>
            </div>
            <div>
              <label className="block text-md">Upload Relieving Letter</label>
              <div className="w-full border rounded-lg px-3 py-2 border-dashed border-indigo-500 flex flex-col items-center mt-3">
                <input
                  type="file"
                  className="hidden"
                  id="appointmentLetter"
                  onChange={(e) => console.log(e.target.files[0])}
                />
                <label htmlFor="appointmentLetter" className="cursor-pointer">
                  <img
                    src={upload}
                    alt="Upload"
                    width={40}
                    className="p-2 bg-indigo-600 rounded-md"
                  />
                </label>
                <h5 className="mt-2 text-gray-600">
                  Drag & Drop or{" "}
                  <span className="text-indigo-500 cursor-pointer">
                    Choose file
                  </span>{" "}
                  to Upload
                </h5>
                <p className="text-gray-400 text-xs mt-1">
                  Supported formats: .jpeg, .pdf
                </p>
              </div>
            </div>
            <div>
              <label className="block text-md">Upload Experience Letter</label>
              <div className="w-full border rounded-lg px-3 py-2 border-dashed border-indigo-500 flex flex-col items-center mt-3">
                <input
                  type="file"
                  className="hidden"
                  id="appointmentLetter"
                  onChange={(e) => console.log(e.target.files[0])}
                />
                <label htmlFor="appointmentLetter" className="cursor-pointer">
                  <img
                    src={upload}
                    alt="Upload"
                    width={40}
                    className="p-2 bg-indigo-600 rounded-md"
                  />
                </label>
                <h5 className="mt-2 text-gray-600">
                  Drag & Drop or{" "}
                  <span className="text-indigo-500 cursor-pointer">
                    Choose file
                  </span>{" "}
                  to Upload
                </h5>
                <p className="text-gray-400 text-xs mt-1">
                  Supported formats: .jpeg, .pdf
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 3 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Account Access
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="email"
                  name="accessEmail"
                  onChange={handleChange}
                  value={formData.accessEmail || ""}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter Email Address"
                />
              </div>
              <div>
                <input
                  type="password"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter Password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password || ""}
                  required
                />
              </div>
              <div>
                <select
                  name="role"
                  onChange={handleChange}
                  value={formData.role || ""}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Choose Role</option>
                  <option value="employee">Employee</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter Slack ID"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter Skype ID"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter Github ID"
                />
              </div>
            </div>
          </div>
        )}
        {/* <button type='submit' className='w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full'>
                    Add Employee
                </button> */}
        {/* </form> */}
        <div className="flex justify-end gap-6 mt-6">
          {activeTab > 0 && (
            <button
              className="px-4 py-2 text-black bg-white rounded-lg border"
              onClick={handleBack}
            >
              Back
            </button>
          )}
          {activeTab < tabs.length - 1 ? (
            <button
              className=" px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-white  bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Add;
