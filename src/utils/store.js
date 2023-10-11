import { combineReducers, configureStore} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import logger from "redux-logger";
import thunk from "redux-thunk";

import userSlice from "./reducers/userReducer";
import adminSlice from "./reducers/adminReducer";
import postSlice from "./reducers/postReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userSlice,
  admin: adminSlice,
  userPosts: postSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);




export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger]
});

export const persistor = persistStore(store);
