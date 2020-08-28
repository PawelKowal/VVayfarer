import React, { useEffect, useState } from "react";
import { makeStyles, Paper } from "@material-ui/core";
import { useSelector } from "react-redux";
import { User } from "../user/User";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
}));

export const UserProfile = () => {
  const classes = useStyles();
  const userId = useSelector((state) => state.user.userId);

  return (
    <div className={classes.root}>
      <Paper>
        <User />
      </Paper>
    </div>
  );
};
