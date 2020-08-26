import React, { useEffect } from "react";
import "./App.css";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function AppWrapper() {
  const isLogged = useSelector((state) => state.login.isLogged);
  let redirectLink = "/VVayfarer/login";
  useEffect(() => {
    if (isLogged) {
      redirectLink = "/VVayfarer/posts";
    }
  });

  return <Redirect to={redirectLink} />;
}

export default AppWrapper;
