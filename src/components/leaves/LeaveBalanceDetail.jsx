// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import { Chart, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// // Register necessary components
// Chart.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend);

// const LeaveBalanceDetail = () => {
//     const { leaveType, year } = useParams();
//     const navigate = useNavigate();
//     const [monthlyData, setMonthlyData] = useState({
//         consumed: Array(12).fill(0),
//         balanced: Array(12).fill(0),
//     });

//     // Fetch data based on leaveType and year
//     const fetchMonthlyData = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/leave/monthly?leaveType=${leaveType}&year=${year}`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             if (response.data.success) {
//                 setMonthlyData(response.data.monthlyData);
//             }
//             console.log(`URL: http://localhost:5000/api/leave/monthly?leaveType=${leaveType}&year=${year}`);

//         } catch (error) {
//             console.error('Error fetching monthly data:', error);
//         }
//     };

//     useEffect(() => {
//         fetchMonthlyData();
//     }, [leaveType, year]);

//     const data = {
//         labels: [
//             'January', 'February', 'March', 'April', 'May', 'June', 
//             'July', 'August', 'September', 'October', 'November', 'December'
//         ],
//         datasets: [
//             {
//                 label: 'Consumed Leave',
//                 data: monthlyData.consumed,
//                 backgroundColor: 'rgba(255, 99, 132, 0.6)',
//             },
//             {
//                 label: 'Balance Leave',
//                 data: monthlyData.balanced,
//                 backgroundColor: 'rgba(75, 192, 192, 0.6)',
//             },
//         ],
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 p-6">
//             <div className="max-w-5xl mx-auto">
//                 <h2 className="text-2xl font-bold mb-4">{leaveType} Leave Balance - {year}</h2>
//                 <Bar data={data} options={{ responsive: true }} />
//                 <button
//                     className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
//                     onClick={() => navigate(-1)}
//                 >
//                     Back to Leave Balance
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default LeaveBalanceDetail;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';

// Register the Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const LeaveBalanceDetail = () => {
  const { leaveType, year } = useParams();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const fetchBalanceDetails = async () => {
    try {
      const response = await axiosInstance.get(`/leave/balance-details?leaveType=${leaveType}&year=${year}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log(response.data); // Check the response structure

      if (response.data.success && Array.isArray(response.data.details)) {
        const data = response.data.details;
        const labels = data.map(item => item.month);
        const appliedLeaves = data.map(item => item.applied || 0); // Default to 0 if undefined
        const balancedLeaves = data.map(item => item.balance || 0); // Default to 0 if undefined

        setChartData({
          labels,
          datasets: [
            {
              label: 'Applied Leaves',
              data: appliedLeaves,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Balanced Leaves',
              data: balancedLeaves,
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
          ],
        });
      } else {
        console.error('Invalid response structure or no details available:', response.data);
      }
    } catch (error) {
      console.error('Error fetching leave details:', error);
    }
  };

  useEffect(() => {
    fetchBalanceDetails();
  }, [leaveType, year]);

  return (
    <div className='p-10'>
      <h3 className='text-2xl font-bold mb-6'>{leaveType} Balance Details for {year}</h3>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default LeaveBalanceDetail;
