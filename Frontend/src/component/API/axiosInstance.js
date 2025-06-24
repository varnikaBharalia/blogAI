
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://blogigy-backend.vercel.app/" || "http://localhost:3000",
  baseURL: "http://localhost:3000",
  withCredentials: true, // for cookies/session if needed
});

export default axiosInstance;
