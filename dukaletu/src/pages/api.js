import axios from "axios";

const api = axios.create({
  baseURL: "http://172.233.153.32:8000", // Replace with your backend server URL
});

export default api;
