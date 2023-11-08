import { createSlice } from "@reduxjs/toolkit";


const posts =[];
let newPost;

const postSlice = createSlice({
  name: "userPosts",
  initialState: {
    posts: posts,
    newPost: newPost
  },
  reducers: {
    setUserPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    updateUserPosts: (state, action) => {
        state.posts.unshift(action.payload.post);
    },
    addNewPost: (state, action) => {
      state.newPost = action.payload;
    },
    removeNewPost: (state, action) => {
      state.newPost = null;
    },
    removeUserPosts: (state, action) => {
        state.posts = [];
    }
  },
});

export const {setUserPosts, removeUserPosts, updateUserPosts, addNewPost, removeNewPost} = postSlice.actions;

export default postSlice.reducer;