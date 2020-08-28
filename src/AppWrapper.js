import React, { useEffect } from "react";
import "./App.css";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function AppWrapper() {
  const isLogged = useSelector((state) => state.user.isLogged);
  let redirectLink = "/VVayfarer/login";
  useEffect(() => {
    if (isLogged) {
      redirectLink = "/VVayfarer/session";
    }
  });

  return <Redirect to={redirectLink} />;
}

export default AppWrapper;
