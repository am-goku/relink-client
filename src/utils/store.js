import { combineReducers, configureStore} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import thunk from "redux-thunk";

import userSlice from "./reducers/userReducer";
import adminSlice from "./reducers/adminReducer";
import postSlice from "./reducers/postReducer";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  storage,
  transforms: [], // Apply any transforms if needed
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  user: userSlice,
  admin: adminSlice,
  userPosts: postSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);




export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store);
