import React, { useEffect, useState } from "react";
import { makeStyles, Paper, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { User } from "../user/User";
import { Link } from "react-router-dom";

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
        <User id={userId} />
        <Link to={"/VVayfarer/editUser"}>
          <Button>Edit profile</Button>
        </Link>
      </Paper>
    </div>
  );
};
