import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import DataTable from 'react-data-table-component'
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';

const DepartmentList = () => {

    const [departments, setDepartments] = useState([]);
    const [depLoading, setDepLoading] =  useState(false)
    const [filteredDepartments, setFilteredDepartments] = useState([])

    const onDepartmentDelete =  () => {
        fetchDepartments()
    }
    const fetchDepartments = async () => {
        setDepLoading(true)
        try{
            const response = await axiosInstance.get('/department',
                {
                    headers:{
                        "Authorization" : `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if(response.data.success) {
                    let sno = 1;
                    const data = await response.data.departments.map((dep) => (
                        {
                            _id: dep._id,
                            sno: sno++,
                            dep_name: dep.dep_name,
                            action:(<DepartmentButtons _id={dep._id} onDepartmentDelete={onDepartmentDelete}/>)

                        }
                    ))
                    setDepartments(data);
                    setFilteredDepartments(data)
                }
        }
        catch(error){
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
        finally{
            setDepLoading(false)
        }
    };
    useEffect(() => {
        fetchDepartments();
    }, []);

    const filterDepartments = (e) => {
        const records = departments.filter((dep) => dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredDepartments(records)

    }

  return (

    <>{depLoading ? <div>Loading ... </div> : 
        <div className='p-10'>
            <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Departments</h3>
            </div>
            <div className='flex justify-between items-center'>
                <input type="text" placeholder='search By Dep Name' onChange={filterDepartments} className='px-4 py-0.5 border'/>
                <Link to="/admin-dashboard/add-departments" className='px-4 py-1 bg-purple-600 text-white rounded-xl'>Add New Department</Link>
            </div>
            <div className='mt-8'>
                <DataTable
                    columns={columns} 
                    data={filteredDepartments}
                    pagination 
                />
            </div>
        </div>
    }</>
  )
}

export default DepartmentList