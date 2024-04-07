import {createSlice} from "@reduxjs/toolkit";

const initialState={
    mode:"light",
    user:{
      friends:[],
      sentFriendRequests:[],
      recievedFriendRequests:[]
    },
    token:null,
    posts:[]
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setMode: (state) => {
        state.mode = state.mode==="light" ? "dark" : "light";
      },
      setUser:(state,action) => {
        state.user=action.payload.user;
      },
      setLogin: (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        console.log(state.user);
      },
      setLogout: (state) => {
        state.user = null;
        state.token = null;
      },
      setFriends: (state, action) => {
        if (state.user) {
          state.user.friends = action.payload.friends || [];
        } else {
          console.error("user does not exist");
        }
      },
      setRecievedFriendRequests: (state, action) => {
        // console.log(action.payload.recievedFriendRequests);
        if (state.user) {
          state.user.recievedFriendRequests = action.payload.recievedFriendRequests || [];
        } else {
          console.error("user does not exist");
        }
      },
      setSentFriendRequests: (state, action) => {
        if (state.user) {
          state.user.sentFriendRequests = action.payload.sentFriendRequests || [];
        } else {
          console.error("user does not exist");
        }
      },
      setPosts: (state, action) => {
        state.posts = action.payload.posts;
      },
      setPost: (state, action) => {
        const updatedPosts = state.posts.map((post) => {
          if (post._id === action.payload.post._id) return action.payload.post;
          return post;
        });
        state.posts = updatedPosts;
      },
    },
  });
  
  export const { setMode, setLogin, setUser, setLogout, setFriends, setRecievedFriendRequests, setSentFriendRequests, setPosts, setPost } =
    authSlice.actions;
  export const authReducer= authSlice.reducer;