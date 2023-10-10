import { createSlice } from "@reduxjs/toolkit";


const posts =[];

const postSlice = createSlice({
  name: "userPosts",
  initialState: {
    posts: posts,
  },
  reducers: {
    setUserPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    updateUserPosts: (state, action) => {
        state.posts.unshift(action.payload.post);
    },
    removeUserPosts: (state, action) => {
        state.posts = [];
    }
  },
});

export const {setUserPosts, removeUserPosts, updateUserPosts} = postSlice.actions;

export default postSlice.reducer;