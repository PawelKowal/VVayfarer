import React from "react";
import { useSelector } from "react-redux";
import { Paper, makeStyles, Typography } from "@material-ui/core";
import { selectPostById } from "./postsSlice";
import { selectUserById } from "../user/usersSlice";
import { Link } from "react-router-dom";
import { AddCommentForm } from "../comments/AddCommentForm";
import { CommentsList } from "../comments/CommentsList";
import { ReactionButton } from "../reactions/ReactionButton";
import { parseISO, formatDistanceToNow } from "date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: "4px 5% 4px 5%",
    },
    marginTop: "8px",
    marginBottom: "8px",
  },
  textStyle: {
    fontWeight: "600",
  },
  textContainer: {
    display: "flex",
  },
  avatarStyle: {
    marginTop: "8px",
    marginRight: "8px",
  },
  avatarWithNameStyle: {
    display: "flex",
    alignItems: "center",
  },
  nameStyle: {
    fontWeight: "600",
    fontSize: "1.2rem",
  },
}));

export const SinglePost = (props) => {
  const classes = useStyles();
  const { id } = props;
  const post = useSelector((state) => selectPostById(state, id));
  const author = useSelector((state) => selectUserById(state, post.authorId));

  const date = parseISO(post.postDate);
  const timeAgo = formatDistanceToNow(date);
  return (
    <Paper elevation={3} className={classes.root}>
      <div className={classes.avatarWithNameStyle}>
        <img
          src={author.image}
          width="10%"
          height="auto"
          className={classes.avatarStyle}
        />
        <div>
          <Link
            to={{
              pathname: "/VVayfarer/user",
              state: { userId: author.id },
            }}
          >
            <Typography className={classes.nameStyle}>{author.name}</Typography>
          </Link>
          {timeAgo}&nbsp;ago
        </div>
      </div>
      <div className={classes.textContainer}>
        <Typography className={classes.textStyle}>
          Description:&nbsp;
        </Typography>
        <Typography>{post.postDescription}</Typography>
      </div>
      <div className={classes.textContainer}>
        <Typography className={classes.textStyle}>Location:&nbsp;</Typography>
        <Typography>{post.location}</Typography>
      </div>
      <img src={post.image} width="90%" height="auto" />
      <div>
        <ReactionButton source="post" id={id} />
      </div>

      <div>
        <CommentsList postId={id} />
      </div>
      <div>
        <AddCommentForm postId={id} />
      </div>
    </Paper>
  );
};
