import React from "react";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { logoutAttempt } from "../login/loginSlice.js";
import { useHistory } from "react-router-dom";

export const PostsList = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  let signOutButtonClicked = () => {
    dispatch(logoutAttempt());
    history.push("/VVayfarer/login");
  };

  return (
    <Button onClick={signOutButtonClicked} color="primary" variant="outlined">
      Sign out
    </Button>
  );
};
