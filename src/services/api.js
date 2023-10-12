import axios from "axios";
import { userAuth } from "../const/localStorage";

export const api = axios.create({
    baseURL: "http://localhost:4000/api"
});



api.interceptors.request.use((config)=>{
    config.headers["Authorization"] = localStorage.getItem(userAuth);
    return config;
}, (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(userAuth);
      // Redirect the user to the login page
      window.location.reload("/login"); // Use the appropriate URL for your login page
    }
    return Promise.reject(error);
});




// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem(userAuth);
//       // Redirect the user to the login page
//       window.location.reload("/login") // Use the appropriate URL for your login page
//     }
//     return Promise.reject(error);
//   }
// );