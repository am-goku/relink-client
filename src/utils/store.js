import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./reducers/userReducer"
import adminSlice from "./reducers/adminReducer"

const store = configureStore({
    reducer: {
        user: userSlice,
        admin: adminSlice,
    }
});


export default store;