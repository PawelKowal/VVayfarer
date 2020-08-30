import React from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: "40vw",
    justifyContent: "center",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  nameStyle: {
    fontWeight: "400",
    fontSize: "2vw",
  },
  descriptionStyle: {
    fontWeight: "400",
    fontSize: "1.2vw",
  },
}));

export const User = (props) => {
  const classes = useStyles();
  const { id } = props;
  const userData = useSelector((state) => selectUserById(state, id));

  return (
    <div className={classes.root}>
      <div>
        <img src={userData.image} width="100%" height="auto" />
        <Typography className={classes.descriptionStyle}>
          {userData.profileDescription}
        </Typography>
      </div>
      <Typography className={classes.nameStyle}>{userData.name}</Typography>
    </div>
  );
};
