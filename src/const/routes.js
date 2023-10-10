export const userUrl = {
    login: "/user/login",
    register: "/user/register",
    fetchUser: "/user/fetch-users",
    getCredentials: "/user/userdetails"
}


export const adminUrl = {
    login: "/admin/login",
    getUsers: "/admin/fetch-users",

    changeBlockStatus: (userId)=> `/admin/${userId}/change-status`,
}



export const postUrl = {
    create: "/post/create-post",
    getPost: "/post/fetch-posts",

    getUserPosts: "/post/fetchUserPosts",
}


export const authUrl = {
    authUser: "/auth/user",
    authAdmin: "/auth/admin",

    sendOtp: "/auth/sent-verification",
    verifyOtp: "/auth/verify-otpToken",
    
}