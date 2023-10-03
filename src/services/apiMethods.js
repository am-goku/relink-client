import { postUrl, userUrl } from "../const/routes"
import { apiCall } from "./apiCalls"





export const getCredentials = () => {
    return new Promise((resolve, reject) => {
        try {
          apiCall("get", userUrl.getCredentials)
            .then((response) => {
              resolve(response);
            })
            .catch((error) => {
              console.log(error);
              resolve({ status: 500, message: error.response });
            });
        } catch (error) {
          console.log(error);
          resolve({ status: 500, message: error.message });
        }
    })
}


export const postLogin = (userData) => {

}


export const postRegister = (userData) => {

}


export const postCreatePost = (postData) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", postUrl.create, postData).then((response) => {
                resolve(response);
            }).catch((error) => {
                console.log(error);
                resolve({ status: 500, message: error.response });
            })
        } catch (error) {
            console.log(error);
            resolve({status:500, message:error.response})
        }
    })
}