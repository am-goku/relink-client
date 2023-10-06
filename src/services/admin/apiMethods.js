import { adminUrl } from "../../const/routes"
import adminApiCalls from "./apiCalls"





//@dec      Admin login
//@method   POST
export const adminPostLogin = (adminData) => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("post", adminUrl.login, adminData).then((response) => {
                console.log(response);
                resolve(response);
              }
            ).catch((err) => {
                throw new Error(err);
            })
        } catch (error) {
            resolve({status: 500, message: error.message});
        }
    })
};



//@dec      Fetch user data
//method    GET
export const adminFetchUsers = () => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("get", adminUrl.getUsers).then((response) => {
                resolve(response);
            }).catch((err) => {
                resolve({status:500, message: err.message});
            })
        } catch (error) {
            resolve({ status: 500, message: error.message });
        }
    })
}



