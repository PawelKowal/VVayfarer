import React, { useEffect, useState } from "react";
import { makeStyles, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";
import { User } from "../user/User";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

export const PostAuthorProfile = (props) => {
  const classes = useStyles();
  const { userId } = props.location.state;
  return (
    <div className={classes.root}>
      <Paper>
        <h1>Post author:</h1>
        <User id={userId} />
      </Paper>
    </div>
  );
};
