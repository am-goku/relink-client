import axios from "axios";
import { refreshToken, userAuth } from "../const/localStorage";

export const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

api.interceptors.request.use(
    async (config) => {
        config.headers["Authorization"] = localStorage.getItem(userAuth);
        return config;
    },
    async (error) => {
        
    //     console.log(error.config);
    //     if (error.response?.status === 401) {
    //   const tokenRefresh = localStorage.getItem(refreshToken);
    //   if (tokenRefresh) {
    //     error.config._retry = true;

    //     try {
    //           //refreshing the access token
    //           const response = await api.post(
    //             "/auth/user/refresh-token",
    //             null,
    //             {
    //               headers: {
    //                 refreshToken: tokenRefresh,
    //               },
    //             }
    //           );
    //           const newAccessToken = response.data.newToken;
    //           localStorage.setItem(userAuth, newAccessToken);
    //           console.log("new access token", newAccessToken);



    //       //calling the original request
    //       error.config.headers["Authorization"] = newAccessToken;

    //       return axios.request(error.config);

                

    //     } catch (refreshError) {
    //       // error while refreshing and sending the original request
    //       localStorage.removeItem(userAuth);
    //     //   alert(error.config)
    //       window.location.reload("/login");

    //       return Promise.reject(refreshError);
    //     }
    //   } else {
    //     // No refresh token available
    //     localStorage.removeItem(userAuth);
    //     window.location.reload("/login");
    //   }

    //   localStorage.removeItem(userAuth);
    //   // Redirect the user to the login page
    //   window.location.reload("/login"); // Use the appropriate URL for your login page
    // } else {
      return Promise.reject(error);
    // }
    
  }
);

