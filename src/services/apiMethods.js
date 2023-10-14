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
            }).catch((error) => {
                reject(error);
            });
        } catch (error) {
            reject(error);
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
};



export const fetchAPost = (postId) => {
    return new Promise((resolve, reject) => {
        try {
            const url = postUrl.getSinglePost(postId);
            apiCall("get", url).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            })
        } catch (error) {
            reject(error);
        }
    })
}



// @desc    Like post
//@route    PATCH /post/like-post
// @access  Registerd users
export const likePost = (userId, postId) => {
    return new Promise((resolve, reject) => {
        try {
            const data = {userId: userId, postId: postId};

            apiCall("patch", postUrl.likePost, data).then((response) => {
                resolve(response);
            }).catch((error) => reject(error));
        } catch (error) {
            reject(error);
        }
    })
}

// @desc    Unlike post
//@route    PATCH /post/unllike-post
// @access  Registerd users
export const unlikePost = (userId, postId) => {
    return new Promise((resolve, reject) => {
        try {
            const data = {userId: userId, postId: postId};

            apiCall("patch", postUrl.unlikePost, data).then((response) => {
                resolve(response);
            }).catch((error) => reject(error));
        } catch (error) {
            reject(error);
        }
    })
};


// @desc    Get comment
//@route    GET /post/fetch-comment
// @access  Registerd users
export const fetchComments = (postId) => {
    return new Promise((resolve, reject) => {
        try {
            const url = postUrl.fetchComments(postId)
            apiCall("get", url).then((response) => {
                resolve(response)
            }).catch((error) => reject(error))
        } catch (error) {
            reject(error);
        }
    })
};
// @desc    Add comment
//@route    POST /post/add-comment
// @access  Registerd users
export const addComment = (userId, postId, content) => {
    return new Promise((resolve, reject) => {
        try {
            const data = {userId: userId, postId: postId, content: content};
            apiCall("post", postUrl.addComment, data).then((response) => {
                resolve(response);
            }).catch((err) => reject(err))
        } catch (error) {
            reject(error);
        }
    })
};
// @desc    Delete comment
//@route    DELETE /post/delete-comment
// @access  Registerd users
export const deleteComment = (commentId) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("delete", postUrl.deleteComment, {commentId:commentId}).then((response) => {
                resolve(response);
            }).catch((err) => reject(err));
        } catch (error) {
            reject(error);
        }
    })
};



// @desc    Remove from saved
// @route   DELETE /user/:userId/save/post/remove/:postId
// @access  Registerd users
export const removeSavedPost = (userId, postId) => {
    return new Promise((resolve, reject) => {
        try {
            const url = userUrl.removeSave(userId, postId);
            apiCall("delete", url).then((response) => {
                resolve(response)
            }).catch((error) =>{
                reject(error);
            })
        } catch (error) {
            reject(error);
        }
    })
};

// @desc    Save post
// @route   DELETE /user/:userId/save/post/:postId
// @access  Registerd users
export const savePost = (userId, postId) => {
    return new Promise((resolve, reject) => {
        try {
            const url = userUrl.savePost(userId, postId);
            apiCall("put", url).then((response) => {
                resolve(response);
            }).catch((error) => reject(error));
        } catch (error) {
            reject(error);
        }
    })
}




// @desc    Follow user
// @route   POST /user/:userId/follow/:followeeUserId
// @access  Registerd users
export const followUser = (userId, followeeId) => {
    return new Promise((resolve, reject) => {
        try {
            const url = userUrl.followUser(userId, followeeId);
            apiCall("post", url).then((response)=> {
                resolve(response);
            }).catch((error) => reject(error));
        } catch (error) {
            reject(error);
        }
    })
}

// @desc    Unfollow user
// @route   POST /user/:userId/unfollow/:followeeUserId
// @access  Registerd users
export const unfollowUser = (userId, followeeId) => {
    return new Promise((resolve, reject) => {
        try {
            const url = userUrl.unfollowUser(userId, followeeId);
            apiCall("post", url).then((response)=> {
                resolve(response);
            }).catch((error) => reject(error));
        } catch (error) {
            reject(error);
        }
    })
};

// @desc    Get connections
// @route   GET /user/fetch/connection/:userId
// @access  Registerd users
export const getConnections = (userId) => {
    return new Promise((resolve, reject) => {
        try {
            const url = userUrl.getConnections(userId);
            apiCall("get", url).then((response) => {
                resolve(response);
            }).catch((err) => reject(err));
        } catch (error) {
            reject(error);
        }
    })
};


// @desc    Search user
// @route   GET /user/search/:key
// @access  Registerd users
export const searchUser = (key) => {
    return new Promise((resolve, reject) => {
        try {
            const url = userUrl.searchUser(key);
            apiCall("get", url).then((response) => {
                resolve(response);
            }).catch((error) => reject(error));
        } catch (error) {
            reject(error);
        }
    })
};


// @desc    Fetch user by username
// @route   /user/fetch/user/username/:username
// @access Authenticated users
export const fetchUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        try {
            const url = userUrl.fetchByUsername(username);
            apiCall("get", url).then((response) => {
                resolve(response)
            }).catch((error) => reject(error));
        } catch (error) {
            reject(error);
        }
    })
};



// @desc    Delete post
//@route    DELETE /post/delete/post/:postId
// @access  Registerd users
export const deletePost = (postId) => {
    return new Promise((resolve, reject) => {
        try {
            const url = postUrl.deletePost(postId);
            apiCall("delete", url).then((response) => {
                resolve(response);
            }).catch((err) => reject(err));
        } catch (error) {
            reject(error);
        }
    })
}



// @desc    Search user
//route     /user/update/user/:username
// @access  Registerd users
export const updateUserData = (username, data) => {
    return new Promise((resolve, reject) => {
        try {
            const url = userUrl.updateData(username);
            apiCall("put", url, data).then((response) => {
                resolve(response);
            }).catch((err) => reject(err));
        } catch (error) {
            reject(error);
        }
    })
}

