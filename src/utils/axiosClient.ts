import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
