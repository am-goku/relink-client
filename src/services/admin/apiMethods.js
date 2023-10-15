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
export const adminFetchUsers = (currentPage, perPage, searchTerm) => {
    return new Promise((resolve, reject) => {
        try {
            adminApiCalls("get", `${adminUrl.getUsers}/?page=${currentPage}&perPage=${perPage}&search=${searchTerm}`).then((response) => {
                resolve(response);
            }).catch((err) => {
                resolve({status:500, message: err.message});
            })
        } catch (error) {
            resolve({ status: 500, message: error.message });
        }
    })
}


export const blockUnblockUser = (userId, status) => {
    return new Promise (async(resolve, reject) => {
        try {
            const url = adminUrl.changeBlockStatus(userId);
            const data = {status: status}

            adminApiCalls("patch", url, data).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        } catch (error) {
            resolve({status: 500, message: error.message});
        }
    })
}



