import React from 'react'
import { useAuth } from '../../context/authContext'

const NavBar = () => {
    const {user, logout} = useAuth()
  return (
    <div className='flex justify-between h-20  items-center px-10' >
        <p className='text-xl'>Welcome !  {user.name}</p>
        <button className='px-6 py-2  text-xl rounded-xl hover:bg-purple-800 hover:text-white'  onClick={logout}>Logout</button>
    </div>
  )
}

export default NavBar