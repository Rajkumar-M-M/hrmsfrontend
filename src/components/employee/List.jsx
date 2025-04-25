import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { EmployeeButtons, columns } from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import add from '../../assets/add-circle.png'
import axiosInstance from '../../utils/axiosInstance'


const List = () => {
    const [employees, setEmployees] = useState([])
    const [empLoading, setEmpLoading] = useState(false)
    const [filteredEmployee,setFilteredEmployees] = useState([])

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true)
            try{
                const response = await axiosInstance.get('/employee',
                    {
                        headers:{
                            "Authorization" : `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                   
                    if(response.data.success) {
                        // console.log(response.data.employees);
                        
                        let sno = 1;
                        const data = await response.data.employees.map((emp) => (
                            {
                                _id: emp._id,
                                sno: sno++,
                                dep_name: emp.department?.dep_name || 'Unknown Department',
                                // dep_name: emp.department || 'Unknown Department',
                                name:emp.userId.name,
                                dob:new Date(emp.dob).toDateString(),
                                profileImage: <img width={40} className='rounded-full' src={`http://localhost:5000/${emp.userId.profileImage}`}/> ,
                                action:(<EmployeeButtons Id={emp._id}/>)

                            }
                        ))
                        // console.log(data);
                        
                        setEmployees(data);
                        setFilteredEmployees(data)
                    }
            }
            catch(error){
                if(error.response && !error.response.data.success){
                    alert(error.response.data.error)
                }
            }
            finally{
                setEmpLoading(false)
            }
        };
        fetchEmployees();
    }, []);

    

    const handleFilter = (e) => {
        const records = employees.filter((emp) => (
            emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        ))
        setFilteredEmployees(records)
    }

  return (
    
    <div className='p-10'>
        <div className='text-center'>
                <h3 className='text-2xl font-bold'>Manage Employee</h3>
            </div>
            <div className='flex justify-between items-center'>
                <input type="text" placeholder='search By Emp Name' onChange={handleFilter}  className='px-4 py-0.5 border'/>
                <Link to="/admin-dashboard/add-employee" className='px-4 py-2 bg-indigo-600 text-white rounded-xl flex'> <img src={add} alt="" /> Add New Employee</Link>
         </div>
         <div className='p-2  m-2'>
         {empLoading ? (
                    <p>Loading employees...</p>
                ) : (
                    
            <DataTable  columns={columns} data={filteredEmployee} pagination/>
        )}
         </div>
    </div>
  )
}

export default List