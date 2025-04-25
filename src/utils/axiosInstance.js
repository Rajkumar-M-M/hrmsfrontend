import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Central base URL
});

export default axiosInstance;


// if you want run locally   use this url- http://localhost:5000/api
// if you want run online server use thos render link - https://hrmsbackend-ueha.onrender.com/api