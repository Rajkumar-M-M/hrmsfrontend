import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import axiosInstance from '../../utils/axiosInstance'


const Detail = () => {
    const {id} = useParams()
    const [leave, setLeave] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchLeave = async () => { 
            try{
                const response = await axiosInstance.get(`/leave/detail/${id}`,
                    {
                        headers: {
                             Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                if (response.data.success){
                    setLeave(response.data.leave)
                }
            }
            catch(error){
                if(error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            }
        };

        fetchLeave();
    }, []);

    const changeStatus = async (id, status) => {
        try{
            const response = await axiosInstance.put(`/leave/${id}`,
                {status},
                {
                    headers: {
                         Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            if (response.data.success){
               navigate('/admin-dashboard/leaves')
            }
        }
        catch(error){
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }

  return (
    <>{leave ? (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
        <h2 className='text-2xl font-bold'>Leave Details</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 pt-10'>
            <div  className=''>
                <img src={`http://localhost:5000/${leave.employeeId.userId.profileImage}`} className='rounded-full w-64' />
            </div>
            <div>
                <div className='flex space-x-3 mb-4'>
                    <p className='text-lg font-bold'>Name:</p>
                    <p className='font-medium'>{leave.employeeId.userId.name}</p>
                </div>
                <div className='flex space-x-3 mb-4'>
                    <p className='text-lg font-bold'>Employee ID:</p>
                    <p className='font-medium'>{leave.employeeId.employeeId}</p>
                </div>
                <div className='flex space-x-3 mb-4'>
                    <p className='text-lg font-bold'>LeaveType:</p>
                    <p className='font-medium'>{leave.leaveType}</p>
                </div>
                <div className='flex space-x-3 mb-4'>
                    <p className='text-lg font-bold'>Reason:</p>
                    <p className='font-medium'>{leave.reason}</p>
                </div>
                <div className='flex space-x-3 mb-4'>
                    <p className='text-lg font-bold'>Department:</p>
                    <p className='font-medium'>{leave.employeeId.department.dep_name}</p>
                </div>
                <div className='flex space-x-3 mb-4'>
                    <p className='text-lg font-bold'>Start Date:</p>
                    <p className='font-medium'>{new Date(leave.startDate).toLocaleDateString()}</p>
                </div>
                <div className='flex space-x-3 mb-4'>
                    <p className='text-lg font-bold'>End Date:</p>
                    <p className='font-medium'>{new Date(leave.toDate).toLocaleDateString()}</p>
                </div>
                <div className='flex space-x-3 mb-4'>
                    <p className='text-lg font-bold'>
                        {leave.status === "Pending" ? "Action" : "Status:"}
                        </p>
                        {leave.status === "Pending" ? (
                            <div className='flex space-x-2'>
                                <button className='px-2 py-0.5 bg-green-500 text-white text-md rounded-full'
                                    onClick={() => changeStatus(leave._id, "Approved")} 
                                >Approve</button>
                                <button className='px-2 py-0.5 bg-red-500 text-white text-md rounded-full'
                                    onClick={() => changeStatus(leave._id, "Rejected")} 
                                    >Reject</button>
                            </div>
                        ) : <p className='font-medium'>{leave.status}</p>
                    }
                </div>
            </div>
        </div>
    </div>
    ):<div> Loading...</div>}</>
  )
}

export default Detail