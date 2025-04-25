import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import axiosInstance from '../../utils/axiosInstance'



 
const LeavesList = () => {
    
    const [leaves,  setLeaves] = useState(null)
    let sno = 1;
    const {id} = useParams()
    const {user} = useAuth()

    const fetchleaves = async () => {
      try{
        const response = await axiosInstance.get(`/leave/${id}/${user.role}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
      });
      console.log(response.data)
      if(response.data.success){
        setLeaves(response.data.leaves)
      }
      }
      catch(error){
        if(error.response && !error.response.data.success){
          alert(error.message);
        }
      }
    }

    useEffect(() => {
      fetchleaves();
    },[])

    if(!leaves){
      return <div>loading</div>
    }

  return (
      <div className='p-10 '>
        <div className='text-center'>
          <h3 className='text-2xl font-bold'>Manage Leaves</h3>
        </div>
        <div className='flex justify-between items-center'>
          <input type="text" placeholder='search By Emp Name'  className='px-4 py-0.5 border'/>
          {user.role === "employee" &&
          <Link to="/employee-dashboard/add-leave" className='px-4 py-1 bg-purple-600 text-white rounded-xl'>Apply Leave</Link>
          }
        </div>

        {/* view */}
        <table className='w-full  text-left my-4 text-white  bg-purple-700 rounded-md'>
          <thead className='text-md uppercase'>
            <tr>
              <th className='px-6 py-3'>S.No</th>
              <th className='px-6 py-3'>Leave Type</th>
              <th className='px-6 py-3'>From Date</th>
              <th className='px-6 py-3'>To Date</th>
              <th className='px-6 py-3'>Reason</th>
              <th className='px-6 py-3'>Status</th>
            </tr>
          </thead>
          <tbody className=''>
              {leaves.map((leave) => (
               <tr key={leave._id} className='bg-white border-b-2 dark:bg-gray-800 dark:border-gray-700'>
                <td className='px-6 py-3'>{sno++}</td>
                <td className='px-6 py-3'>{leave.leaveType}</td>
                <td className='px-6 py-3'>{new Date(leave.startDate).toLocaleDateString()}</td>
                <td className='px-6 py-3'>{new Date(leave.toDate).toLocaleDateString()}</td>
                <td className='px-6 py-3'>{leave.reason}</td>
                <td className='px-6 py-3'>{leave.status}</td>
               </tr>
              ))}
          </tbody>
        </table>
      </div>
  )
}

export default LeavesList