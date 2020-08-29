import React from "react";
import { useSelector } from "react-redux";
import { Paper } from "@material-ui/core";
import { SinglePost } from "./SinglePost";
import { NewPostForm } from "./NewPostForm";
import { selectPostsIds } from "./postsSlice";

export const Posts = () => {
  const postIds = useSelector((state) => selectPostsIds(state));
  return (
    <Paper>
      <NewPostForm />
      {postIds.map((x) => (
        <SinglePost id={x} key={x} />
      ))}
    </Paper>
  );
};
