import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import {
  addToMockComments,
  getMockComments,
  updateMockComment,
} from "../../mockApi/mockComments";

const commentsAdapter = createEntityAdapter();

const commentsSlice = createSlice({
  name: "comments",
  initialState: commentsAdapter.getInitialState(),
  reducers: {
    addComment(state, action) {
      const commentId = addToMockComments(action.payload);
      commentsAdapter.addOne(state, { id: commentId, ...action.payload });
    },
    fetchComments(state, action) {
      const comments = getMockComments();
      commentsAdapter.addMany(state, comments);
    },
    commentReactionAdded(state, action) {
      const { id, userId } = action.payload;
      const existingComment = state.entities[id];
      if (existingComment) {
        existingComment.reactsAmount++;
        existingComment.reactsAuthors.push(userId);
      }
      updateMockComment(action.payload);
    },
  },
});

export const {
  selectById: selectCommentById,
  selectAll: selectAllComments,
} = commentsAdapter.getSelectors((state) => state.comments);

export const {
  addComment,
  fetchComments,
  commentReactionAdded,
} = commentsSlice.actions;

export const selectCommentsByPostId = createSelector(
  [selectAllComments, (state, postId) => postId],
  (comments, postId) => comments.filter((comment) => comment.postId === postId)
);

export default commentsSlice.reducer;
