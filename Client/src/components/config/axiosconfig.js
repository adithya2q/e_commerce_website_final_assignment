import axios from "axios";


const axiosInstance = axios.create({
  baseURL:process.env.REACT_APP_API_URL,
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