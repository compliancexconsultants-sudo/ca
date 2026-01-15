import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const ca = JSON.parse(localStorage.getItem("legalhubCA"));
  if (ca?.token) {
    config.headers.Authorization = `Bearer ${ca.token}`;
  }
  return config;
});

export default API;
