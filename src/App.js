import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LoginPage } from "./features/login/LoginPage.js";
import { SessionSwitch } from "./features/session/SessionSwitch.js";
import AppWrapper from "./AppWrapper.js";

function App() {
  return (
    <Router>
      <Route exact path="/VVayfarer/login" component={LoginPage} />
      <Route exact path="/VVayfarer/session" component={SessionSwitch} />
      <Route path="/VVayfarer/" component={AppWrapper} />
    </Router>
  );
}

export default App;
