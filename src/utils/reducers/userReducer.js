import { createSlice } from "@reduxjs/toolkit";
import { userAuth } from "../../const/localStorage";
import { authUrl } from "../../const/routes";
import { apiCall } from "../../services/apiCalls";


let token, isValidUser, userData, currentRoom;


const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: userData,
    validUser: isValidUser,
    chatRooms: [],
    currentRoom: currentRoom
  },
  reducers: {
    setReduxUser: (state, action) => {
      state.userData = action.payload.userData;
      state.validUser = action.payload.validUser;
    },
    updateReduxUser: (state, action) => {
      state.userData = action.payload;
    },
    removeReduxUser: (state, action) => {
      state.userData = null;
      state.validUser = false;
      localStorage.removeItem(userAuth);
    },



    //chat related reduceres

    setReduxChatRoom: (state, action) => {
      state.chatRooms = action.payload
    },

    updateReduxChatRoom: (state, action) => {
      const array = state?.chatRooms
      // Create a Map to store keyId to index mapping
      const RoomIdToIndexMap = new Map();
      for (let i = 0; i < array.length; i++) {
        RoomIdToIndexMap.set(array[i], i);
      }

      const index = RoomIdToIndexMap.get(action?.payload);
      if (index !== undefined) {
        // Swap the object at the index with the first element in the array
        [array[0], array[index]] = [array[index], array[0]];
      }

      state.chatRooms = array;
    },

    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload;
    },

    updateCurrentRoom: (state, action) => {
      const newRoom = state.currentRoom;

      newRoom.lastMessage = action.payload?.textMessage;
      newRoom.lastMessageTime = action.payload?.createdAt
      state.currentRoom = newRoom;
    }
  },
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
      dispatch(removeReduxUser())
    }
  } catch (e) {
    dispatch(removeReduxUser());
  }
};


export const removeUser = () => async (dispatch) => {
  dispatch(removeReduxUser());
}


export const { setReduxUser, updateReduxUser, removeReduxUser, setReduxChatRoom, updateReduxChatRoom, setCurrentRoom, updateCurrentRoom } = userSlice.actions;

export default userSlice.reducer;