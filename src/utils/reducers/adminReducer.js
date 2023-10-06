import { createSlice } from "@reduxjs/toolkit";
import { adminAuth } from "../../const/localStorage";
import { authUrl } from "../../const/routes";
import adminApiCalls from "../../services/admin/apiCalls";




let token, isValidAdmin, adminData;

try {
  token = localStorage.getItem(adminAuth);

  if (token) {
    const data = {
      headers: {
        Authorization: token,
      },
    };
    const response = await adminApiCalls("get", authUrl.authAdmin, data);
    isValidAdmin = response.valid;
    adminData = response.admin;
  } else {
    isValidAdmin = false;
  }
} catch (e) {
  token = null;
  isValidAdmin = false;
}



const adminSlice = createSlice({
  name: "admin",
  initialState:{
    adminData: adminData,
    validAdmin: isValidAdmin
  },
  reducers: {
    setReduxAdmin: (state, action) => {
      state.adminData = localStorage.getItem(adminAuth)
    },
    removeReduxAdmin: (state) => {
      state.adminData = null;
      state.validAdmin = false;
      localStorage.removeItem(adminAuth);
    },
  },
});




export const { setReduxAdmin, removeReduxAdmin } = adminSlice.actions;

export default adminSlice.reducer;
