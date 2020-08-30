import React from "react";
import { useSelector } from "react-redux";
import { Paper, makeStyles } from "@material-ui/core";
import { SinglePost } from "./SinglePost";
import { NewPostForm } from "./NewPostForm";
import { selectPostsIds } from "./postsSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: "#e0e0e0",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  feedBackgroundStyle: {
    width: "50vw",
  },
}));

export const Posts = () => {
  const classes = useStyles();
  const postIds = useSelector((state) => selectPostsIds(state));

  const reversedPostIds = postIds.slice().reverse();
  return (
    <div className={classes.root}>
      <Paper className={classes.feedBackgroundStyle} elevation={3}>
        <NewPostForm />
        {reversedPostIds.map((x) => (
          <SinglePost id={x} key={x} />
        ))}
      </Paper>
    </div>
  );
};
