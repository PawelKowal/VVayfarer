import React from "react";
import { useSelector } from "react-redux";
import { Paper } from "@material-ui/core";
import { selectPostById } from "./postsSlice";
import { selectUserById } from "../user/usersSlice";
import { Link } from "react-router-dom";
import { AddCommentForm } from "../comments/AddCommentForm";
import { CommentsList } from "../comments/CommentsList";
import { ReactionButton } from "../reactions/ReactionButton";

export const SinglePost = (props) => {
  const { id } = props;
  const post = useSelector((state) => selectPostById(state, id));
  const author = useSelector((state) => selectUserById(state, post.authorId));
  return (
    <Paper elevation={3}>
      <div>
        {author.image && <img src={author.image} width="40" height="40" />}
        <Link
          to={{
            pathname: "/VVayfarer/user",
            state: { userId: author.id },
          }}
        >
          {author.name}
        </Link>
        {post.postDate}
      </div>
      <div>{post.postDescription}</div>
      <div>{post.localisation}</div>
      <img src={post.image} width="400" height="400" />
      <div>
        <CommentsList postId={id} />
      </div>
      <div>
        <AddCommentForm postId={id} />
      </div>
      <div>
        <ReactionButton source="post" id={id} />
      </div>
    </Paper>
  );
};
