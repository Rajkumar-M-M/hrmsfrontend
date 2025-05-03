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
                        const data = response.data.employees.map((emp) => ({
                            _id: emp._id,
                            sno: sno++,
                            dep_name: emp.department?.dep_name || 'Unknown',
                            name: emp.userId.name,
                            email: emp.userId.email,
                            designation: emp.designation,
                            gender: emp.gender,
                            dob: new Date(emp.dob).toDateString(),
                            location: emp.location,
                            maritalStatus: emp.maritalStatus,
                            employeeId: emp.employeeId,
                            profileImage: emp.userId.profileImage ? (
                                <img
                                  width={40}
                                  height={40}
                                  className="rounded-full object-cover"
                                  src={`http://localhost:5000/${emp.userId.profileImage}`}
                                  alt="profile"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-sm">
                                  {emp.userId.name.charAt(0).toUpperCase()}
                                </div>
                              ),
                              
                            // action: <EmployeeButtons Id={emp._id} />,
                          }));
                          
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
         <div className="p-4 m-2">
  {empLoading ? (
    <p>Loading employees...</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredEmployee.map((emp) => (
        <Link
        to={`/admin-dashboard/employees/${emp._id}`}
        key={emp._id}
        className="block bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer group"
      >
        <div className="flex items-center space-x-4">
          {emp.profileImage}
          <div>
            <p className="text-lg font-semibold">{emp.name}</p>
            <p className="text-sm text-gray-500">{emp.email}</p>
            <p className="text-sm text-gray-400">{emp.designation}</p>
          </div>
        </div>
      
        <div className="mt-4 text-sm text-gray-700 space-y-1">
          <p><strong>Department:</strong> {emp.dep_name}</p>
          <p><strong>Gender:</strong> {emp.gender}</p>
          <p><strong>DOB:</strong> {emp.dob}</p>
          <p><strong>Location:</strong> {emp.location}</p>
          <p><strong>Marital Status:</strong> {emp.maritalStatus}</p>
          <p><strong>Employee ID:</strong> {emp.employeeId}</p>
        </div>
      
        {/* <div className="mt-4">{emp.action}</div> */}
      </Link>
      
      ))}
    </div>
  )}
</div>

    </div>
  )
}

export default List