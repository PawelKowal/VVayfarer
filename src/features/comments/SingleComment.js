import React from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "../user/usersSlice";
import { ReactionButton } from "../reactions/ReactionButton";

export const SingleComment = (props) => {
  const { comment } = props;
  const author = useSelector((state) =>
    selectUserById(state, comment.authorId)
  );
  return (
    <div>
      <div>
        {author.image && <img src={author.image} width="20" height="20" />}{" "}
        {author.name}
      </div>
      <div>{comment.commentDate}</div>
      <div>{comment.content}</div>
      <div>
        <ReactionButton source="comment" id={comment.id} />
      </div>
    </div>
  );
};
