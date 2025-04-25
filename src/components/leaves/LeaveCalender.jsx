// import React, { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { useAuth } from '../../context/authContext';
// import axios from 'axios';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import 'react-big-calendar/lib/css/react-big-calendar.css';

// const LeavesList = () => {
//   const [leaves, setLeaves] = useState([]);
//   const { id } = useParams();
//   const { user } = useAuth();
//   const localizer = momentLocalizer(moment);

//   const fetchleaves = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/leave`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });

//       if (response.data.success) {
//         setLeaves(response.data.leaves);
//         console.log("Fetched Leaves:", response.data.leaves); // Check the structure
//       }
//     } catch (error) {
//       if (error.response && !error.response.data.success) {
//         alert(error.message);
//       } else {
//         console.error('Error fetching leaves:', error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchleaves();
//   }, [id]);

//   const events = leaves.map((leave) => ({
//     title: user.role === 'admin' 
//       ? `${leave.userId || 'Unknown Employee'} - ${leave.leaveType}: ${leave.reason}` 
//       : `${leave.leaveType}: ${leave.reason}`,
//     start: new Date(leave.startDate),
//     end: new Date(leave.toDate),
//     allDay: true,
//   }));

//   return (
//     <div className='p-10'>
//       <div className='text-center'>
//         <h3 className='text-2xl font-bold'>Manage Leaves</h3>
//       </div>
//       <div className='flex justify-between items-center mb-4'>
//         {user.role === 'employee' && (
//           <Link to="/employee-dashboard/add-leave" className='px-4 py-1 bg-purple-600 text-white rounded-xl'>
//             Apply Leave
//           </Link>
//         )}
//       </div>

//       {/* Calendar View */}
//       <div style={{ height: '40vh' }}>
//         <Calendar
//           localizer={localizer}
//           events={events}
//           startAccessor="start"
//           endAccessor="end"
//           style={{ height: 500 }}
//         />
//       </div>
//     </div>
//   );
// };

// export default LeavesList;


import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axiosInstance from '../../utils/axiosInstance';

const LeavesList = () => {
  const [leaves, setLeaves] = useState([]);
  const { id } = useParams();
  const { user } = useAuth();
  const localizer = momentLocalizer(moment);

  const fetchLeaves = async () => {
    try {
      const response = await axiosInstance.get(`/leave`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        setLeaves(response.data.leaves);
        console.log("Fetched Leaves:", response.data.leaves); // Check the structure here
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      } else {
        console.error('Error fetching leaves:', error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [id]);

  const events = leaves.map((leave) => {
    const employeeName = leave.employeeId?.userId?.name || 'Unknown Employee'; // Adjust as necessary

    return {
      title: user.role === 'admin' 
        ? `${employeeName} - ${leave.leaveType}: ${leave.reason}` 
        : `${leave.leaveType}: ${leave.reason}`,
      start: new Date(leave.startDate),
      end: new Date(leave.toDate),
      allDay: true,
    };
  });

  return (
    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Leave calender</h3>
      </div>
      <div className='flex justify-between items-center mb-4'>
        {user.role === 'employee' && (
          <Link to="/employee-dashboard/add-leave" className='px-4 py-1 bg-purple-600 text-white rounded-xl'>
            Apply Leave
          </Link>
        )}
      </div>

      {/* Calendar View */}
      <div style={{ height: '40vh' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    </div>
  );
};

export default LeavesList;
