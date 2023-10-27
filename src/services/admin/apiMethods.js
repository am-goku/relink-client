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





////////////////////////////////////////////////// REPORT SECTION //////////////////////////////////////////////////////////////////
// @desc    Fetch post reports
// @route   GET /admin/reports/posts
// @access  Admins
export const getPostReports = (perPage, search) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${adminUrl.userReports}?perPage=${perPage}&search=${search}`
            adminApiCalls("get", url).then((response) => {
                resolve(response);
            }).catch((err)=> reject(err))
        } catch (error) {
            reject(error)
        }
    })
}

// @desc    Fetch user reports
// @route   GET /admin/reports/users
// @access  Admins
export const getUserReports = (perPage, search) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${adminUrl.postReports}?perPage=${perPage}&search=${search}`
            adminApiCalls("get", url).then((response) => {
                resolve(response);
            }).catch((err)=> reject(err))
        } catch (error) {
            reject(error)
        }
    })
}



// @desc    Fetch posts with pagination and populated user
// @route   GET /admin/fetch-posts
// @access  Admins
export const fetchPosts = (page, perPage, search) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${adminUrl.fetchPosts}?perPage=${perPage}&search=${search}&page=${page}`;
      adminApiCalls("get", url)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};