import React, { useState } from 'react'
import {NavLink} from 'react-router-dom'
import { TbSettingsStar } from "react-icons/tb";
import { useAuth } from '../../context/authContext';
import dashboard from '../../assets/apps.png'
import logo from '../../assets/logo.png'
import users from '../../assets/users.png'
import department from '../../assets/department.png'
import attendence from '../../assets/attendence.png'
import payroll from '../../assets/payroll.png'
import jobs from '../../assets/jobs.png'
import candidates from '../../assets/candidates.png'
import leaves from '../../assets/leaves.png'
import holiday from '../../assets/holiday.png'
import setting from '../../assets/setting.png'

const AdminSidebar = () => {
    const [isLeavesOpen, setIsLeavesOpen] = useState(false);

    const toggleLeavesMenu = () => {
      setIsLeavesOpen(!isLeavesOpen);
    };
    const {user} = useAuth()
  return (
    <div className=' h-screen fixed left-0 top-0 bottom-0  w-96'>
        <div className=' flex p-4  '>
            <img src={logo} alt="" width={150}/>
        </div>
        <div className='px-4 w-64'>
            <NavLink to="/admin-dashboard" className={({isActive})  => `${isActive ? "text-purple-500 bg-purple-50 font-bold" :""} flex items-center space-x-4 py-3 px-4 rounded-md `} end> 
                <img src={dashboard} alt="" />
                <span className='text-base'>Dashboard</span>
            </NavLink>
            <NavLink to="/admin-dashboard/employees" className={({isActive})  => `${isActive ? "text-purple-500 bg-purple-50 font-bold" :""} flex items-center space-x-4 py-3 px-4 rounded-md`} end> 
                <img src={users} alt="" />
                <span className='text-base'>All Employees</span>
            </NavLink>
            <NavLink to="/admin-dashboard/departments" className={({isActive})  => `${isActive ? "text-purple-500 bg-purple-50 font-bold" :""} flex items-center space-x-4 py-3 px-4 rounded-md`} end> 
                <img src={department} alt="" />
                <span className='text-base'>All Departments</span>
            </NavLink>
            {/* <NavLink to="/admin-dashboard/" className={({isActive})  => `${isActive ? "text-purple-500 bg-purple-50 font-bold" :""} flex items-center space-x-4 py-3 px-4 rounded-md`} end> 
                <img src={attendence} alt="" />
                <span className='text-base'>Attendence</span>
            </NavLink> */}
            <NavLink to="/admin-dashboard/" className={({isActive})  => `${isActive ? "text-purple-500 bg-purple-50 font-bold" :""} flex items-center space-x-4 py-3 px-4 rounded-md`} end> 
                <img src={payroll} alt="" />
                <span className='text-base'>Payroll</span>
            </NavLink>
            {/* <NavLink to="/admin-dashboard/" className={({isActive})  => `${isActive ? "text-purple-500 bg-purple-50 font-bold" :""} flex items-center space-x-4 py-3 px-4 rounded-md`} end> 
                <img src={jobs} alt="" />
                <span className='text-base'>Jobs</span>
            </NavLink> */}
            <NavLink to={'/admin-dashboard/leaves/'} className={({isActive})  => `${isActive ? "text-purple-500 bg-purple-50 font-bold" :""} flex items-center space-x-4 py-3 px-4 rounded-md`} end>
                <img src={candidates} alt="" />
                <span className='text-base'>Candidates</span>
            </NavLink>
            <NavLink to={'/admin-dashboard/leaves/'} className={({isActive})  => `${isActive ? "text-purple-500 bg-purple-50 font-bold" :""} flex items-center space-x-4 py-3 px-4 rounded-md`} end>
                <img src={leaves} alt="" />
                <span className='text-base'>Leaves</span>
            </NavLink>
            <NavLink to="/admin-dashboard/holidayCalender" className={({isActive})  => `${isActive ? "text-purple-500 bg-purple-50 font-bold" :""} flex items-center space-x-4 py-3 px-4 rounded-md`} end>
                <img src={holiday} alt="" />
                <span className='text-base'>Holidays</span>
            </NavLink>
            <NavLink to="/admin-dashboard/setting"className={({isActive})  => `${isActive ? "text-purple-500 bg-purple-50 font-bold" :""} flex items-center space-x-4 py-3 px-4 rounded-md`} end> 
                <img src={setting} alt="" />
                <span className='text-xl'>Settings</span>
            </NavLink>
        </div>
    </div>
  )
}

export default AdminSidebar