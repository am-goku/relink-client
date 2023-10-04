import { api } from "./api";

export const apiCall = async (method, url, data) => {
  return await new Promise(async (resolve, reject) => {
    try {
      let response;

      if (method === "post") {
        response = await api.post(url, data).catch((err) => {
          resolve({ status: 500, message: err.message });
        });
      } else if (method === "get") {
        response = await api.get(url, data).catch((err) => {
          resolve({ status: 500, message: err.message });
        });
      } else if (method === "patch") {
        response = await api.patch(url, data).catch((err) => {
          resolve({ status: 500, message: err.message });
        });
      } else if (method === "delete") {
        response = await api.delete(url, data).catch((err) => {
          resolve({ status: 500, message: err.message });
        });
      }
      console.log(response);
      resolve(response.data);
    } catch (err) {
        console.log(err);
        resolve({ status: 500, message: err.message });
    }
  });
};
