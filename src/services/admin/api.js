import axios from "axios";
import { adminAuth } from "../../const/localStorage";
import { BASE_URL } from "../../const/url";

export const adminApi = axios.create({
  baseURL: `${BASE_URL}/api`,
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
