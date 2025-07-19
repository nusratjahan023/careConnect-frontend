import axios from "axios";

const token = localStorage.getItem("token");

const jobAxiosInstance = axios.create({
  baseURL: "http://localhost:8082",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default jobAxiosInstance;
