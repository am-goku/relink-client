import axios from "axios";
import { userAuth } from "../const/localStorage";

export const api = axios.create({
    baseURL: "http://localhost:4000/api"
});



api.interceptors.request.use((config)=>{
    config.headers["Authorization"] = localStorage.getItem(userAuth);
    return config;
}, (error) => {
    return Promise.reject(error);
});