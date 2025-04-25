import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'
import axiosInstance from '../utils/axiosInstance';

const UserContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const verifyUser = async() =>{
            try{
                const token = localStorage.getItem('token')
                if(token){
                const response = await axiosInstance.get('/auth/verify', {
                    headers: {
                        "Authorization" : `Bearer ${token}`
                    }
                })
                if(response.data.success){
                    setUser(response.data.user)
                }
            } else{
                setUser(null)
                setLoading(false)
            }
            }catch(error){
                if(error.response && !error.response.data.data.error){
                    setUser(null)
                }
                else{
                    setError("server Error")
                }
            }finally{
                setLoading(false)
            }
        }
        verifyUser()
    }, [])

    const login = (user) =>{
        setUser(user)
    } 
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);
