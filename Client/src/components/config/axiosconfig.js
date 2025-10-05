import axios from "axios";


const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 5000,
  headers: {
    'Accept': 'application/json'
  }
});
axiosInstance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("@token"));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;