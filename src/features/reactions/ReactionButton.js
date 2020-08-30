import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCommentById } from "../comments/commentsSlice";
import { selectPostById } from "../posts/postsSlice";
import StarsIcon from "@material-ui/icons/Stars";
import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { commentReactionAdded } from "../comments/commentsSlice";
import { postReactionAdded } from "../posts/postsSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  starStyle: {
    color: "#ffd600",
  },
}));

export const ReactionButton = (props) => {
  const classes = useStyles();
  const { source, id } = props;
  const userId = useSelector((state) => state.user.userId);
  let dispatch = useDispatch();
  let reactsAmount;
  let reactsAuthorsIds;
  let selector = {
    comment: selectCommentById,
    post: selectPostById,
  };
  let dispatchers = {
    comment: commentReactionAdded,
    post: postReactionAdded,
  };
  const src = useSelector((state) => selector[source](state, id));
  reactsAmount = src.reactsAmount;
  reactsAuthorsIds = src.reactsAuthors;

  const canUserAddReact = reactsAuthorsIds.includes(userId);

  const handleStarClick = () => {
    dispatch(dispatchers[source]({ id, userId }));
  };

  return (
    <div className={classes.root}>
      <Typography>Give a star: </Typography>
      <IconButton onClick={handleStarClick} disabled={canUserAddReact}>
        <StarsIcon fontSize="small" className={classes.starStyle} />
      </IconButton>{" "}
      {reactsAmount}
    </div>
  );
};
