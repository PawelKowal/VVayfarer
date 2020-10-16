import React, { useEffect } from "react";
import "./App.css";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function AppWrapper() {
  const loginStatus = useSelector((state) => state.user.loginStatus);
  let history = useHistory();
  /*useEffect(() => {
    if (loginStatus === "succeeded") {
      history.push("/VVayfarer/session");
    } else {
      history.push("/VVayfarer/login");
    }
  });*/
  if (loginStatus === "succeeded") {
    history.push("/VVayfarer/session");
  } else {
    history.push("/VVayfarer/login");
  }
  return null;
}

export default AppWrapper;
