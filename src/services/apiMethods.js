import { authUrl, postUrl, userUrl } from "../const/routes"
import { apiCall } from "./apiCalls"




//@dec      Fetch username/email
//method    GET
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



//@dec      Login user
//method    POST
export const postLogin = (userData) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall('post', userUrl.login, userData).then((response)=>{
                resolve(response);
            })
        } catch (error) {
            console.log(error);
            resolve({ status: 500, message: error.message });
        }
    })

}



//@dec      Register user
//method    POST
export const postRegister = (userData) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", userUrl.register, userData).then((response)=>{
                resolve(response);
            })
        } catch (error) {
            console.log(error);
            resolve({status:500, message: "Somethings wrong."})
        }
    })
}




//@dec      Create post
//method    POST
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





//@dec      Fetch posts
//method    GET
export const getAllPosts = () => {
    return new Promise ((resolve, reject) => {
        try {
            apiCall("get", postUrl.getPost).then((response) => {
                resolve(response)
            })
        } catch (error) {
            console.log(error);
            resolve({status:500, message:error.response})
        }
    })
}




//@dec      Fetch single user
//method    GET
export const getUser = (userId) =>{
    return new Promise ((resolve, reject) => {
        try {
            apiCall("get", `${userUrl.fetchUser}?userId=${userId}`).then((response) => {
                resolve(response);
            }).catch((error) => {
                throw new Error(error)
            })
        } catch (error) {
            resolve({status:500, message:error.message})
        }
    })
};



//@dec      Sent Otp
//method    POST
export const sentOtp = (email) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", authUrl.sendOtp, {email: email}).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        } catch (error) {
            reject(error);
        }
    })
}

//@dec      Verify Otp
//method    POST
export const verifyOtp = (email, otpToken) => {
  return new Promise((resolve, reject) => {
    try {
      const data = { email: email, otpToken: otpToken };
      apiCall("post", authUrl.verifyOtp, data)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};


//@dec      Fetch a user posts
//method    GET
export const fetchUserPosts = (userId) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", `${postUrl.getUserPosts}?userId=${userId}`)
              .then((response) => {
                resolve(response);
              })
              .catch((error) => reject(error));
        } catch (error) {
            reject(error);
        }
    })
}