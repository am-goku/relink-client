import { authUrl, messageUrl, postUrl, userUrl } from "../const/routes"
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

// @desc    Login google user
// @route   POST /user/login/Oauth
// @access  Public
export const OauthLogin = (userData) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall('post', userUrl.Oauthlogin, userData).then((response)=> {
                resolve(response);
            }).catch((err)=> {
                reject(err)
            })
        } catch (error) {
            reject(error)
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

// @desc    Register google user
// @route   POST /user/register/Oauth
// @access  Public
export const registerOauth = (userData) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", userUrl.OauthReg, userData).then((response) => {
              resolve(response);
            }).catch((error) => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}


// @desc    Get users with email
// @route   GET /user/fetch-user/email/:email
// @access  Public
export const fetchUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const url = userUrl.fetchByEmail(email);

        apiCall('get', url).then((response) => {
            resolve(response)
        }).catch((err) => reject(err));
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
export const getAllPosts = (page) => {
    return new Promise ((resolve, reject) => {
        try {
            apiCall("get", `${postUrl.getPost}?page=${page}`).then((response) => {
                resolve(response)
            }).catch((error) => {
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    })
}

// @desc    Fetch posts count
// @route   GET /post/fetch-count
// @access  Private
export const getPostsCount = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", postUrl.getPostCount).then((response) => {
                resolve(response)
            }).catch((err)=> {
                reject(err)
            })
        } catch (error) {
            reject(error)
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
                console.log(error);
                reject(error);
            })
        } catch (error) {
            reject({status:500, message:error.message})
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

// @desc    Get reply comments
//@route    GET /post/comments/replies/:commentId
// @access  Registerd users
export const getReplies = (commentId) => {
    return new Promise((resolve, reject) => {
        const url = postUrl.fetchReplies(commentId);

        apiCall("get", url).then((response) => {
            resolve(response)
        }).catch((err) => reject(err));
    })
}

// @desc    Reply comment
//@route    POST /post/comments/reply-to/:commentId
// @access  Registerd users
export const replyToComment = ({commentId, postId, userId, content}) => {
    return new Promise((resolve, reject) => {
        const url = postUrl.addReply(commentId);
        
        apiCall("post", url, {postId, userId, content}).then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        })
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
                console.log('call response', response);
                resolve(response);
            }).catch((err) => reject(err));
        } catch (error) {
            reject(error);
        }
    })
}



//////////////////////////////////////////// CHAT SECTION //////////////////////////////////
// @desc    Create or get chatRoom of two
// @route   /messages/inbox/room/:firstId/:secondId
// @access  Users - private
export const setUpChatRoom = (firstId, secondId) => {
  return new Promise((resolve, reject) => {
    try {
      const url = messageUrl.getChatRoom(firstId, secondId);
      apiCall("put", url)
        .then((chatRoom) => {
          resolve(chatRoom);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      reject(error);
    }
  });
};

// @desc    Get chats from a room
// @route   /messages/inbox/:roomId
// @access  Users - private
export const getMessages = (roomId) => {
    return new Promise((resolve, reject) => {
        try {
            const url = messageUrl.getMessages(roomId);

            apiCall("get", url).then((messages)=> {
                resolve(messages);
            }).catch((err)=> {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    })
};

// @desc    Send new chat
// @route   /messages/inbox/new-message/:roomId
// @access  Users - private
export const sendMessage = (roomId, textMessage, senderId) => {
    return new Promise((resolve, reject) => {
        try {
            const url = messageUrl.newMessage(roomId);
            const data = {
                textMessage: textMessage,
                senderId: senderId
            };

            apiCall("post", url, data).then((response)=> {
                resolve(response)
            }).catch((err)=> {
                reject(err)
            })
        } catch (error) {
            reject(error)
        }
    })
};

// @desc    Get rooms with userID
// @route   GET /messages/inbox/get-room/userID/:userId
// @access  Users - private
export const getRoomWithUserID = (userId) => {
    return new Promise((resolve, reject) => {
        try {
            const url = messageUrl.getRoomFromUser(userId);
            apiCall("get", url).then((response) => {
                resolve(response);
            }).catch((error) => reject(error));
        } catch (error) {
            reject(error);
        }
    })
};





///////////////////////////////////////////////////////// REPORT SECTION //////////////////////////////////////////////////////////
// @desc    Report user
// @route   POST /user/report/user/:userId
// @access  Registerd users
export const reportUser = (userId, username, targetId, details) => {
    return new Promise((resolve, reject) => {
        try {
            const url = userUrl.report(userId, username);
            const data = {
                targetId: targetId,
                details: details
            }
            apiCall("post", url, data).then((response) => {
                resolve(response);
            }).catch((error) => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}

// @desc    Report user
// @route   POST /user/report/user/:userId
// @access  Registerd users
export const reportPost = (userId, username, targetId, details) => {
    return new Promise((resolve, reject) => {
        try {
            const url = postUrl.report(userId, username);
            const data = {
                targetId: targetId,
                details: details
            }
            apiCall("post", url, data).then((response) => {
                resolve(response);
            }).catch((error) => reject(error))
        } catch (error) {
            reject(error)
        }
    })
}


// @desc    Register fcm
// @route   GET /user/fcm/:userId/:fcmToken
// @access  Registerd users
export const registerFcmToken = (userId, token) => {
    return new Promise((resolve, reject) => {
        try {
            const url = userUrl.regFcm(userId, token)
            apiCall("post", url).then((response) => {
                resolve(response);
            }).catch((error) => reject(error))
        } catch (error) {
            reject(error)
        }
    })
};


// @desc    Fetch notifications
// @route   /user/:userId/notifications
// @access  Registerd users
export const fetchNotifications = (userId) => {
    return new Promise((resolve, reject) => {
        const url = userUrl.getNotes(userId);

        apiCall("get", url).then((response) => {
            resolve(response);
        }).catch((error) => reject(error));
    })
}


// @desc    Read notification
// @route   PATCH /user/notifications/read/:notificationId
// @access  Registerd users
export const readNotification = (notifyId) => {
    return new Promise((resolve, reject) => {
        const url = userUrl.readNote(notifyId);
        apiCall("patch", url).then((response) => {
            resolve(response);
        }).catch((error) => reject(error));
    })
}

// @desc    Delete notification
// @route   DELETE /user/notifications/delete/:userId
// @access  Registerd users
export const deleteNotifications = (userId) => {
    return new Promise((resolve, reject) => {
      const url = userUrl.deleteNotes(userId);
      apiCall("delete", url)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => reject(error));
    });
};



// @desc    Get chatRoom of two
// @route   /messages/inbox/room/fetch/:firstId/:secondId
// @access  Users - private
export const getRoomWithIds = (firstId, secondId) => {
  return new Promise((resolve, reject) => {
    const url = messageUrl.getRooms(firstId, secondId);
    apiCall("get", url)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => reject(err));
  });
};





// @desc    Logout user
// @route   POST /user/logout/:userId
// @access  Registerd users
export const logoutUser = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      const url = userUrl.logOut(userId);
      apiCall("post", url)
        .then((res) => {
          if(res.status === 'OK'){
            resolve(true);
          } else {
            reject(false);
          }
        })
        .catch((err) => reject(err));
    } catch (err_1) {
      reject(err_1);
    }
  });
};




/////////////////////// password related //////////////////////
export const requestChangePassword = (userId, password)=> {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", userUrl.reqChangePassword, {userId, password}).then((res) => {
                resolve(res)
            }).catch((err) => reject(err))
        } catch (error) {
            reject(error);
        }
    })
}