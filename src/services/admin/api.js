import axios from "axios";
import { adminAuth } from "../../const/localStorage";

export const adminApi = axios.create({
  baseURL: "http://relink.thetrendly.shop/api",
  //baseURL: "http://localhost:4000/api",
});

adminApi.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = localStorage.getItem(adminAuth);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
