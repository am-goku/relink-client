export const userUrl = {
    login: "/user/login",
    register: "/user/register",
    fetchUser: "/user/fetch-users",
    getCredentials: "/user/userdetails",


    //saved posts
    savePost: (userId, postId) => `/user/${userId}/save/post/${postId}`,
    removeSave: (userId, postId) => `/user/${userId}/save/post/remove/${postId}`,

    //connection
    followUser: (userId, followeeId) => `/user/${userId}/follow/${followeeId}`,
    unfollowUser: (userId, followeeId) => `/user/${userId}/unfollow/${followeeId}`,
    getConnections: (userId) => `/user/fetch/connection/${userId}`,

    //search user
    searchUser: (key) => `/user/search/${key}`,
    fetchByUsername: (username) => `/user/fetch/username/${username}`,

    //update user
    updateData: (username) => `/user/update/user/${username}`,

    
}


export const adminUrl = {
    login: "/admin/login",
    getUsers: "/admin/fetch-users",

    changeBlockStatus: (userId)=> `/admin/${userId}/change-status`,
}



export const postUrl = {
  create: "/post/create-post",
  getPost: "/post/fetch-posts",

  getSinglePost: (postId) => `/post/fetch-single-post/${postId}`,

  getUserPosts: "/post/fetchUserPosts",

  //delete post
  deletePost: (postId) =>`/post/delete/post/${postId}`,

  //likes
  likePost: "/post/like-post",
  unlikePost: "/post/unlike-post",

  //comments
  fetchComments: (postId) => `/post/fetch-comments/${postId}`,
  addComment: "/post/add-comment",
  deleteComment: "/post/delete-comment",
};


export const authUrl = {
    authUser: "/auth/user",
    authAdmin: "/auth/admin",

    sendOtp: "/auth/sent-verification",
    verifyOtp: "/auth/verify-otpToken",
    
}