import React, { useEffect } from "react";
import "./App.css";
import { Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

function AppWrapper() {
  const isLogged = useSelector((state) => state.user.isLogged);
  let history = useHistory();
  useEffect(() => {
    if (isLogged) {
      history.push("/VVayfarer/session");
    } else {
      history.push("/VVayfarer/");
    }
  });

  return null;
}

export default AppWrapper;
