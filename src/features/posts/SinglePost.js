import React from "react";
import { useSelector } from "react-redux";
import { Paper } from "@material-ui/core";
import { selectPostById } from "./postsSlice";
import { selectUserById } from "../user/usersSlice";

export const SinglePost = (props) => {
  const { id } = props;
  const post = useSelector((state) => selectPostById(state, id));
  const author = useSelector((state) => selectUserById(state, post.authorId));
  return (
    <Paper elevation={3}>
      <div>
        {author.name}, {post.postDate}
      </div>
      <div>{post.postDescription}</div>
      <div>{post.localisation}</div>
      <img src={post.image} width="400" height="400" />
    </Paper>
  );
};
