import axios from "axios";
import { getCookie } from "../utils/cookieHelper";

const defaultOptions = {
  baseUrl: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
};

// create axios instance
const API = axios.create(defaultOptions);

// Set the AUTH token for any request
API.interceptors.request.use(function (config) {
  const token = getCookie("session");
  if (token) config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default API;
