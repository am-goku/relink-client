import { createSlice } from "@reduxjs/toolkit";
import { userAuth } from "../../const/localStorage";
import { authUrl } from "../../const/routes";
import { apiCall } from "../../services/apiCalls";


let token, isValidUser, userData

try{
    token = localStorage.getItem(userAuth);

    if(token) {
        const data = {
            headers: {
                Authorization: token,
            },
        };
        const response = await apiCall("get", authUrl.authUser, data);
        isValidUser = response.valid;
        userData = response.user;
    } else {
        isValidUser = false;
    }
} catch(e){
    token = null;
    isValidUser = false;
}


const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: userData,
        validUser: isValidUser,
    },
    reducers: {
        setReduxUser: (state, action) => {
            state.userData = localStorage.getItem(userAuth);
        },
        removeReduxUser: (state, action) => {
            state.userData = null;
            state.validUser = false;
            localStorage.removeItem(userAuth);
        },
    }
});


export const { setReduxUser, removeReduxUser} = userSlice.actions;

export default userSlice.reducer;