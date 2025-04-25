import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';

const Setting = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({ ...setting, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();        
        if (setting.newPassword !== setting.confirmPassword) {
            setError("Password not match");
        
        }else{   
            try {
                const response = await axiosInstance.put("/setting/change-password", 
                    setting,
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        },  
                    }
                );
            if (response.data.success) {
                alert("Password hasbeen changed")
                navigate("/employee-dashboard");
        
            }
        } 
    catch (error) {
            if (error.response) {
                setError(error.response.data.error || "An error occurred");
            } else {
                setError("Network error");
            }
        } finally {
        }
    }
}

    return (
        <div className='max-w-3xl mx-auto  bg-white p-8 rounded-md shadow-md'>
            {/* <h2 className='text-2xl font-bold mb-6'>Change Password</h2>
             <p className='text-red-500'>{error}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='text-sm font-medium text-gray-700'>Old Password</label>
                    <input
                        type="password"
                        name="oldPassword"
                        placeholder='Enter Old Password' 
                        onChange={handleChange}
                        className='mt-1 w-full p-2 border-gray-300 rounded-md'
                        required
                    />
                </div>
                <div>
                    <label className='text-sm font-medium text-gray-700'>New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        placeholder='Enter New Password' 
                        onChange={handleChange}
                        className='mt-1 w-full p-2 border-gray-300 rounded-md'
                        required
                    />
                </div>
                <div>
                    <label className='text-sm font-medium text-gray-700'>Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder='Confirm New Password'
                        onChange={handleChange}
                        className='mt-1 w-full p-2 border-gray-300 rounded-md'
                        required
                    />
                </div>
                <button 
                    type='submit' 
                    className='w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md'>
                Change Password
                </button>
            </form> */}
            <div className='rounded-xl'>
                <div className='flex justify-between items-center pb-4'>
                    <div>
                        <h3 className='font-bold text-sm'>Appearence</h3>
                        <span className='text-gray-400 text-sm'>Customize how your theme looks on your device</span>
                    </div>
                   <div>
                    <button className='border px-4 rounded-md'>light</button>
                   </div>
                </div>
                <hr />
                <div className='flex justify-between items-center pb-4 pt-4'>
                    <div>
                        <h3 className='font-bold text-sm'>Language</h3>
                        <span className='text-gray-400 text-sm'>Select your language</span>
                    </div>
                   <div>
                    <button className='border px-4 rounded-md'>light</button>
                   </div>
                </div>
                <hr />
                <div className='flex justify-between items-center pb-4 pt-4'>
                    <div>
                        <h3 className='font-bold text-sm'>Two-factor Authentication</h3>
                        <span className='text-gray-400 text-sm'>Keep your account secure by enabling 2FA via mail</span>
                    </div>
                   <div>
                    <button className='border px-4 rounded-md'>light</button>
                   </div>
                </div>
                <hr />
                <div className='flex justify-between items-center pb-4 pt-4'>
                    <div>
                        <h3 className='font-bold text-sm'>Mobile Push Notifications</h3>
                        <span className='text-gray-400 text-sm'>Receive push notifcation</span>
                    </div>
                   <div>
                    <button className='border px-4 rounded-md'>light</button>
                   </div>
                </div>
                <hr />
                <div className='flex justify-between items-center pb-4 pt-4'>
                    <div>
                        <h3 className='font-bold text-sm'>Desktop Notifications</h3>
                        <span className='text-gray-400 text-sm'>Receive push notifcation in desktop</span>
                    </div>
                   <div>
                    <button className='border px-4 rounded-md'>light</button>
                   </div>
                </div>
                <hr />
                <div className='flex justify-between items-center pb-4 pt-4'>
                    <div>
                        <h3 className='font-bold text-sm'>Email Notifications</h3>
                        <span className='text-gray-400 text-sm'>Receive email notifcation</span>
                    </div>
                   <div>
                    <button className='border px-4 rounded-md'>light</button>
                   </div>
                </div>
                <hr />
                <div className='flex justify-between items-center pb-4 pt-4'>
                    <div>
                        <h3 className='font-bold text-sm'>Change Password</h3>
                        <span className='text-gray-400 text-sm'>make the changes for password</span>
                    </div>
                   <div>
                    <button className='border px-4 rounded-md'>click</button>
                   </div>
                </div>
                <hr />
            </div>
        </div>
    );
};

export default Setting;
