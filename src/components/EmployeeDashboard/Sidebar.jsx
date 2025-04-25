import React, { useState } from 'react'
import {NavLink} from 'react-router-dom'
import { FaTachometerAlt } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { TbSettingsStar } from "react-icons/tb";
import { useAuth } from '../../context/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {

    const [isLeavesOpen, setIsLeavesOpen] = useState(false);

    const toggleLeavesMenu = () => {
      setIsLeavesOpen(!isLeavesOpen);
    };

    const {user} = useAuth()
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
        <div className='bg-purple-800 flex items-center justify-center  p-2'>
            <h3 className='text-2xl font-bold text-center'>Employee Management System</h3>
        </div>
        <div className='px-4'>
            <NavLink to="/employee-dashboard" className={({isActive})  => `${isActive ? "bg-purple-700" :""} flex items-center space-x-4 py-5 px-4 rounded-full`} end> 
                <FaTachometerAlt size={30}/>
                <span className='text-xl'>Dashboard</span>
            </NavLink>
            <NavLink to={`/employee-dashboard/profile/${user._id}`} className={({isActive})  => `${isActive ? "bg-purple-700" :""} flex items-center space-x-4 py-5 px-4 rounded-full`} end> 
                <FaUserAlt size={30}/>
                <span className='text-xl'>My Profile</span>
            </NavLink>
            <NavLink  className={`flex items-center  py-5 px-4 `} end> 
                <FaCalendarAlt size={30}/>
                <span className='text-xl'>
                <nav className="relative  px-4 rounded-md">
                    <button
                        className=" py-2 text-xl"
                        onClick={toggleLeavesMenu}
                    >
                        Leaves
                        <span className="ml-10">
                            <FontAwesomeIcon icon={isLeavesOpen ? faChevronUp : faChevronDown} />
                        </span>
                    </button>
                    {isLeavesOpen && (
                        <div className='grid'>
                            <NavLink to={`/employee-dashboard/leaves/${user._id}`} className={({isActive})  => `${isActive ? "bg-purple-700" :""} hover:bg-purple-400 py-2 my-1 px-2 text-base rounded-md `} end>
                                 Leave Apply
                            </NavLink>
                            <NavLink to="/employee-dashboard/leavebalance" className={({isActive})  => `${isActive ? "bg-purple-700" :""} py-2 my-1 px-2 text-base rounded-md hover:bg-purple-400 `} end>
                                Leave Balances
                            </NavLink>
                            <NavLink to="/employee-dashboard/leaveCalender" className={({isActive})  => `${isActive ? "bg-purple-700" :""} py-2 my-1 px-2 text-base rounded-md hover:bg-purple-400`} end>
                                Leave Calendar
                            </NavLink>
                            <NavLink to="/employee-dashboard/holidayCalender" className={({isActive})  => `${isActive ? "bg-purple-700" :""} py-2 my-1 px-2 text-base rounded-md hover:bg-purple-400`} end>
                                Holiday Calendar
                            </NavLink>

                        </div>
                    )}
                    </nav>
                </span>
            </NavLink>
            <NavLink to="/employee-dashboard/setting" className={({isActive})  => `${isActive ? "bg-purple-700" :""} flex items-center space-x-4 py-5 px-4 rounded-full`} end> 
                <TbSettingsStar size={30}/>
                <span className='text-xl'>Setting</span>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar