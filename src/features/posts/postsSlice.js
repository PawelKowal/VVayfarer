import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { addToMockPosts, getMockPosts } from "../../mockApi/mockPosts";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.postDate.localeCompare(b.date),
});

const postsSlice = createSlice({
  name: "posts",
  initialState: postsAdapter.getInitialState(),
  reducers: {
    addPost(state, action) {
      const postId = addToMockPosts(action.payload);
      console.log(action.payload);
      postsAdapter.addOne(state, { id: postId, ...action.payload });
    },
    fetchPosts(state, action) {
      const posts = getMockPosts();
      postsAdapter.addMany(state, posts);
    },
  },
});

export const {
  selectById: selectPostById,
  selectIds: selectPostsIds,
} = postsAdapter.getSelectors((state) => state.posts);

export const { addPost, fetchPosts } = postsSlice.actions;

export default postsSlice.reducer;
