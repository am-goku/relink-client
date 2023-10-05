import { adminApi } from "./api";

const adminApiCalls = async (method, url, data) => {
    return new Promise(async (resolve, reject) => {
        try {
      let response;

      if (method === "post") {
        response = await adminApi.post(url, data).catch((err) => {
          resolve({ status: 500, message: err.message });
        });
      } else if (method === "get") {
        response = await adminApi.get(url, data).catch((err) => {
          resolve({ status: 500, message: err.message });
        });
      } else if (method === "patch") {
        response = await adminApi.patch(url, data).catch((err) => {
          resolve({ status: 500, message: err.message });
        });
      } else if (method === "delete") {
        response = await adminApi.delete(url, data).catch((err) => {
          resolve({ status: 500, message: err.message });
        });
      }
      resolve(response.data);
    } catch (err) {
        console.log(err);
        resolve({ status: 500, message: err.message });
    }
    })
}

export default adminApiCalls