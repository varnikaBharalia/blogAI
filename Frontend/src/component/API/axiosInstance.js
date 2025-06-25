
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://blogigy-backend.vercel.app/",
  baseURL: "http://localhost:3000",
  withCredentials: true, 
});

export default axiosInstance;
