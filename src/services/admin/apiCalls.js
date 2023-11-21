import axios from "axios";
import { adminAuth, adminRefresh } from "../../const/localStorage";
import { adminApi } from "./api";

const adminApiCalls = async (method, url, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response, error;

      if (method === "post") {
        response = await adminApi.post(url, data).catch((err) => {
          error = err;
        });
      } else if (method === "get") {
        response = await adminApi.get(url, data).catch((err) => {
          error = err;
        });
      } else if (method === "patch") {
        response = await adminApi.patch(url, data).catch((err) => {
          error = err;
        });
      } else if (method === "delete") {
        response = await adminApi.delete(url, data).catch((err) => {
          error = err;
        });
      }


      
      if (response) {
        resolve(response.data);
      } else if (error) {
        if (error.response?.status === 401) {
          refreshAccessToken(error)
            .then((response) => {
              console.log("error in apiCalls:::::", response);
              resolve(response.data);
            })
            .catch((error) => {
              localStorage.setItem(adminAuth, "");
              localStorage.setItem(adminRefresh, "");
              window.location.reload("/admin/login");
            });
        } else {
          reject(error?.response?.data);
        }
      }

    } catch (err) {
      console.log(err);
      resolve({ status: 500, message: err.message });
    }
  });
};


const refreshAccessToken = async (error) => {
  try {
    if (error.response?.status === 401) {
      const tokenRefresh = localStorage.getItem(adminRefresh);

      if (tokenRefresh) {
        error.config._retry = true;

        return new Promise(async (resolve, reject) => {
          try {
            //refreshing the access token
            const response = await axios
              .post(
                //"http://localhost:4000/api/auth/admin/refresh-token",
                "http://relink.thetrendly.shop/api/auth/admin/refresh-token",
                null,
                {
                  headers: {
                    Authorization: tokenRefresh,
                  },
                }
              )
              .catch((err) => {
                console.log("token refresh error: ", err);
                reject(err);
              });
            if (response) {
              const newAccessToken = response.data.newToken;
              localStorage.setItem(adminAuth, newAccessToken);
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
            localStorage.removeItem(adminAuth);
            console.log("refresh error", refreshError);
            window.location.reload("/admin/login");
          }
        });
      } else {
        // No refresh token available
        localStorage.removeItem(adminAuth);
        localStorage.removeItem(adminRefresh);
        window.location.reload("/admin/login");
      }
    }
  } catch (error) {
    localStorage.removeItem(adminAuth);
    localStorage.removeItem(adminRefresh);
    window.location.reload("/admin/login");
  }
};















export default adminApiCalls;
