import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import usersReducer from "../features/user/usersSlice";
import postsReducer from "../features/posts/postsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    users: usersReducer,
  },
});
