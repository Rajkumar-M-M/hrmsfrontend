import { useNavigate } from "react-router-dom"
import axios from "axios"
import axiosInstance from "./axiosInstance"

export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno
    
    },
    {
        name: "Department Name",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name: "Action",
        selector: (row) => row.action
    },
]

export const DepartmentButtons = ({_id, onDepartmentDelete}) => {
    const navigate = useNavigate()

    const handleDelete =  async (id) => {
        const confirm = window.confirm("Do you want to Delete?")
        if(confirm){
        try{
            const response = await axiosInstance.delete(`/department/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                }
            );
            if(response.data.success){
                onDepartmentDelete();
            }
        }
        catch (error){
            if(error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }
    };
    return (
      <div className="flex space-x-3 text-md">
        <button className="px-3 py-1 bg-purple-600 text-white rounded-xl" onClick={() =>navigate(`/admin-dashboard/department/${_id}`)}>Edit</button>
        <button className="px-3 py-1 bg-red-600 text-white rounded-xl" onClick={() => handleDelete(_id)}>Delete</button>
      </div>
    )
}