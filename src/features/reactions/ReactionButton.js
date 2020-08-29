import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCommentById } from "../comments/commentsSlice";
import { selectPostById } from "../posts/postsSlice";
import StarsIcon from "@material-ui/icons/Stars";
import { IconButton } from "@material-ui/core";
import { commentReactionAdded } from "../comments/commentsSlice";
import { postReactionAdded } from "../posts/postsSlice";

export const ReactionButton = (props) => {
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
    <div>
      <IconButton onClick={handleStarClick} disabled={canUserAddReact}>
        <StarsIcon fontSize="medium" />
      </IconButton>{" "}
      {reactsAmount}
    </div>
  );
};
