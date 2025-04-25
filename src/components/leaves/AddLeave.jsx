import React, { useEffect, useState } from 'react';
import { useAuth } from "../../context/authContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';




const AddLeave = () => {
  const{user} = useAuth()
  const [leave, setLeave]  = useState({
    userId: user._id,
  })
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setLeave((prevState) => ({ ...prevState, userId: user._id }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(leave.startDate) > new Date(leave.toDate)) {
      return alert('End Date cannot be earlier than Start Date');
    }
    setLoading(true);
      try{
        const response = await axiosInstance.post(`/leave/add`, leave,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        if (response.data.success){
            navigate(`/employee-dashboard/leaves/${user._id}`)
        }
      }
      catch(error){
          if(error.response && !error.response.data.success) {
              alert(error.response.data.error)
          }
      }
      finally {
        setLoading(false); // Stop loading after the request
      }
  }
  return (
    <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold pb-4'>Request For Leave</h2>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col space-y-4'>
            <div>
              <label className='block text-sm font-semibold text-gray-700'>Leave Type</label>
              <select name="leaveType" onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required>
                <option value="">Select Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Privilege Leave">Privilege Leave</option> {/* Added Privilege Leave */}
                <option value="Bereavement Leave">Bereavement Leave</option> {/* Added Bereavement Leave */}
                <option value="Loss of Pay">Loss of Pay</option>
              </select>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* from date */}
              <div>
                <label className='block text-sm font-medium text-gray-700'>From Date</label>
                <input type="date" name='startDate' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required/>
              </div>
              {/* to Date */}
              <div>
                <label className='block text-sm font-medium text-gray-700'>To Date</label>
                <input type="date" name='toDate' onChange={handleChange} className='mt-1 p-2 block w-full border border-gray-300 rounded-md' required/>
              </div>
              </div>
              {/* description */}
              <div>
                <label className='block text-sm font-medium text-gray-700'>Description</label>
                <textarea name="reason" placeholder='Reason' onChange={handleChange} className='w-full border border-gray-300' required></textarea>
              </div> 
          </div>
          <button type='submit' className='w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md'>
            Add Leave
          </button>
        </form>

    </div>
  )
}

export default AddLeave