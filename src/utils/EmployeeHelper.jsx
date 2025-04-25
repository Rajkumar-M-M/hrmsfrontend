import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";


export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: "90px"
    
    },
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
        width: "150px",
        cell: (row) => <span className="capitalize">{row.name}</span>
    },
    {
        name: "Image",
        selector: (row) => row.profileImage,
        width: "120px"
    },
    {
        name: "Department",
        selector: (row) => row.dep_name,
         width: "170px",
         cell: (row) => <span className="uppercase">{row.dep_name}</span>
    },
    {
        name: "DOB",
        selector: (row) => row.dob,
        sortable: true,
         width: "150px"
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: "true"
    },
]

export const fetchDepartments = async () => {
    let departments
    try{
        const response = await axiosInstance.get('/department',
            {
                headers:{
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success) {
                departments = response.data.departments

            }
    }
    catch(error){
        if(error.response && !error.response.data.success){
            alert(error.response.data.error)
        }
    }
    return departments
};

export const EmployeeButtons = ({Id}) => {
    const navigate = useNavigate();

    return (
      <div className="flex space-x-3 text-md">
        <button className="px-3 py-1 bg-purple-600 text-white rounded-xl" onClick={() =>navigate(`/admin-dashboard/employees/${Id}`)}>View</button>
        <button className="px-3 py-1 bg-yellow-600 text-white rounded-xl" onClick={() =>navigate(`/admin-dashboard/employees/edit/${Id}`)}>Edit</button>
        <button className="px-3 py-1 bg-green-600 text-white rounded-xl" onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}>Leave</button>
      </div>
    )
}