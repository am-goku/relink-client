import { createSlice } from "@reduxjs/toolkit";
import { userAuth } from "../../const/localStorage";
import { authUrl } from "../../const/routes";
import { apiCall } from "../../services/apiCalls";


let token, isValidUser, userData


const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: userData,
        validUser: isValidUser,
    },
    reducers: {
        setReduxUser: (state, action) => {
            state.userData = action.payload.userData;
            state.validUser = action.payload.validUser;
        },
        removeReduxUser: (state, action) => {
            state.userData = null;
            state.validUser = false;
            localStorage.removeItem(userAuth);
        },
    }
});


export const userAuthenticator = () => async (dispatch) => {
  try {
    token = localStorage.getItem(userAuth);

    if (token) {
      const data = {
        headers: {
          Authorization: token,
        },
      };
      apiCall("get", authUrl.authUser, data).then((response) => {
        isValidUser = response.valid;
        userData = response.user;
        dispatch(setReduxUser({ userData, validUser: isValidUser}));
      }).catch((error) => {
        dispatch(setReduxUser({userData: null, validUser: false}));
      })
      
    } else {
      isValidUser = false;
    }
  } catch (e) {
    token = null;
    isValidUser = false;
  }
};


export const { setReduxUser, removeReduxUser} = userSlice.actions;

export default userSlice.reducer;