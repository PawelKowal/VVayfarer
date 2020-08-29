import React from "react";
import { useSelector } from "react-redux";
import { selectCommentsByPostId } from "./commentsSlice";
import { SingleComment } from "./SingleComment";

export const CommentsList = (props) => {
  const { postId } = props;
  const comments = useSelector((state) =>
    selectCommentsByPostId(state, postId)
  );
  let commentsList = comments.map((x) => <SingleComment comment={x} key={x} />);

  return <div>{commentsList}</div>;
};
