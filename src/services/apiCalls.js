import { userAuth } from "../const/localStorage";
import { api } from "./api";


export const apiCall = async (method, url, data) => {
  return await new Promise(async (resolve, reject) => {
    try {
      let response, error;

      if (method === "post") {
        response = await api.post(url, data).catch((err) => {
          error = err;
        });
      } else if (method === "get") {
        console.log("data", data);
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
        if(error.response.status === 401){
          localStorage.removeItem(userAuth)
        }
        reject(error);
      }
    } catch (err) {
        console.log(err);
        reject(err);
    }
  });
};
