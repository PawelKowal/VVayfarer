import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { LoginPage } from "./features/authentication/LoginPage.js";
import { SessionSwitch } from "./features/session/SessionSwitch.js";
import { useSelector } from "react-redux";

function App() {
  const loginStatus = useSelector((state) => state.users.loginStatus);
  return (
    <Router>
      <Route strict path="/VVayfarer/session" component={SessionSwitch} />
      <Route exact path="/VVayfarer/login" component={LoginPage} />
      <Route path="/VVayfarer/">
        {loginStatus === "succeeded" ? (
          <Redirect to="/VVayfarer/session" />
        ) : (
          <Redirect to="/VVayfarer/login" />
        )}
      </Route>
    </Router>
  );
}

export default App;
