import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import logo from  '../assets/logo.png'
import welcome from '../assets/welcome.png'
import axiosInstance from '../utils/axiosInstance';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error,setError] = useState(null)
    const {login} = useAuth()
    const navigate =  useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axiosInstance.post("/auth/login", 
                {email, password});
                if(response.data.success){
                    login(response.data.user)
                    localStorage.setItem("token", response.data.token)
                    if(response.data.user.role === 'admin'){
                        navigate('/admin-dashboard')
                    }
                    else{
                        navigate('/employee-dashboard')
                    }
                 }
                }

        catch(error)
        {
            if(error.response && error.response.data.success){
                setError(error.response.data.error)
                console.log(error.response.data.error);
                
            }
            else{
                setError("server Error")
                console.log(error.message);
                
            }
        }
    };
    
  return (
    <div className='flex flex-col items-center h-screen justify-center  space-y-6'>
        <div className='p-6 w-80 bg-white'>
            <div className='mb-2'>
                <img src={logo} width={200} />
            </div>
            <h2 className='text-3xl font-bold mb-2'>Welcome</h2>
            <h2 className='text-xl text-gray-400 mb-4'>Please login here</h2>
            {error && <p className='text-red-800'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <input type="email" className='w-full px-3 py-2 border-2 rounded-md' placeholder='Enter your email' required  onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='mb-4'>
                    <input type="password" className='w-full px-3 py-2 border-2 rounded-md' placeholder='Enter your password' required onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className='mb-4 flex items-center justify-between'>
                    <label className='inline-flex items-center'>
                        <input type="checkbox" className='form-checkbox'/>
                        <span className='ml-2 text-gray-700'>Remember me</span>
                    </label>
                    <a href="#" className='text-purple-700'>Forgot password?</a>
                </div>
                <div className='mb-4'>
                    <button type='submit' className='w-full bg-purple-700 text-white py-2 rounded-3xl'>Login</button>
                </div>
            </form>
        </div>
    </div>
  )
}


export default Login