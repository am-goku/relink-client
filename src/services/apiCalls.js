import { api } from "./api";
import { refreshToken, userAuth } from "../const/localStorage";
import axios from "axios";



export const apiCall = async (method, url, data) => {
  return await new Promise(async (resolve, reject) => {
    try {
      let response, error;

      if (method === "post") {
        response = await api.post(url, data).catch((err) => {
          error = err;
        });
      } else if (method === "get") {
        response = await api.get(url, data).catch((err) => {
          error = err;
        });
      } else if (method === "patch") {
        response = await api.patch(url, data).catch((err) => {
          error = err;
        });
      } else if (method === "delete") {
        response = await api.delete(url, data).catch((err) => {
          error = err;
        });
      } else if (method === "put"){
        response = await api.put(url, data).catch((err) => {
          error = err;
        })
      }
      
      if(response){
        resolve(response.data);
      } else if (error) {
        if(error.response?.status === 401){
          
          refreshAccessToken(error).then((response)=> {
            console.log("error in apiCalls:::::", response);
            resolve(response.data);
          }).catch((error)=>{
            reject(error?.response?.data);
          })
        } else{
          reject(error?.response?.data);
        }
      }
    } catch (err) {
        console.log(err);
        reject(err);
    }
  });
};




const refreshAccessToken = async (error) => {
  try {
    if (error.response?.status === 401) {
      const tokenRefresh = localStorage.getItem(refreshToken);

      if (tokenRefresh) {
        error.config._retry = true;

        return new Promise(async (resolve, reject) => {
          try {
            //refreshing the access token
            const response = await axios.post(
              "http://localhost:4000/api/auth/user/refresh-token",
              null,
              {
                headers: {
                  Authorization: tokenRefresh,
                },
              }
            ).catch((err)=> {
              console.log("token refresh error: ", err);

            })
            if(response){
              const newAccessToken = response.data.newToken;
              localStorage.setItem(userAuth, newAccessToken);
              console.log("new access token", newAccessToken);

              //calling the original request
              error.config.headers["Authorization"] = newAccessToken;

              axios(error.config)
                .then((response) => {
                  resolve(response);
                })
                .catch((error) => {
                  reject(error);
                });
            }
          } catch (refreshError) {
            // error while refreshing and sending the original request
            localStorage.removeItem(userAuth);
            console.log("refresh error", refreshError);
            window.location.reload("/login");
          }
        })
      } else {
        // No refresh token available
        localStorage.clear();
        window.location.reload("/login");
      }
    }
  } catch (error) {
    localStorage.clear();
    window.location.reload("/login");
  }
}
