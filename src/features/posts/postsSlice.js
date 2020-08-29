import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import {
  addToMockPosts,
  getMockPosts,
  updateMockPost,
} from "../../mockApi/mockPosts";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.postDate.localeCompare(b.date),
});

const postsSlice = createSlice({
  name: "posts",
  initialState: postsAdapter.getInitialState(),
  reducers: {
    addPost(state, action) {
      const postId = addToMockPosts(action.payload);
      postsAdapter.addOne(state, { id: postId, ...action.payload });
    },
    fetchPosts(state, action) {
      const posts = getMockPosts();
      postsAdapter.addMany(state, posts);
    },
    postReactionAdded(state, action) {
      const { id, userId } = action.payload;
      const existingPost = state.entities[id];
      if (existingPost) {
        existingPost.reactsAmount++;
        existingPost.reactsAuthors.push(userId);
      }
      updateMockPost(action.payload);
    },
  },
});

export const {
  selectById: selectPostById,
  selectIds: selectPostsIds,
  selectAll: selectAllPosts,
} = postsAdapter.getSelectors((state) => state.posts);

export const { addPost, fetchPosts, postReactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
