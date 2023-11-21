import axios from "axios";
import { refreshToken, userAuth } from "../const/localStorage";

export const api = axios.create({
  baseURL: "http://relink.thetrendly.shop/api",
  //baseURL: "http://localhost:4000/api",
});

api.interceptors.request.use(
  async (config) => {
    config.headers["Authorization"] = localStorage.getItem(userAuth);
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

