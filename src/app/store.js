import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import usersReducer from "../features/user/usersSlice";
import postsReducer from "../features/posts/postsSlice";
import commentsReducer from "../features/comments/commentsSlice";
import reactionsReducer from "../features/reactions/reactionsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    posts: postsReducer,
    users: usersReducer,
    comments: commentsReducer,
    reactions: reactionsReducer,
  },
});
