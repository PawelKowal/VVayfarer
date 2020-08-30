import React from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "../user/usersSlice";
import { ReactionButton } from "../reactions/ReactionButton";
import { parseISO, formatDistanceToNow } from "date-fns";
import { Typography, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  avatarWithNameStyle: {
    display: "flex",
    alignItems: "center",
  },
  avatarStyle: {
    marginRight: "8px",
  },
  contentStyle: {
    fontWeight: "600",
  },
}));

export const SingleComment = (props) => {
  const classes = useStyles();
  const { comment } = props;
  const author = useSelector((state) =>
    selectUserById(state, comment.authorId)
  );

  const date = parseISO(comment.commentDate);
  const timeAgo = formatDistanceToNow(date);
  return (
    <div>
      <div className={classes.avatarWithNameStyle}>
        <img
          src={author.image}
          width="7%"
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
            <Typography className={classes.contentStyle}>
              {author.name}
            </Typography>
          </Link>
          {timeAgo}&nbsp;ago
        </div>
      </div>
      <div>
        <Typography className={classes.contentStyle}>
          Comment: &nbsp;
        </Typography>
        <Typography>{comment.content}</Typography>
      </div>
      <div>
        <ReactionButton source="comment" id={comment.id} />
      </div>
    </div>
  );
};
