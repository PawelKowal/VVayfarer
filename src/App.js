import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LoginPage } from "./features/login/LoginPage.js";
import { SessionSwitch } from "./features/session/SessionSwitch.js";
import AppWrapper from "./AppWrapper.js";

function App() {
  return (
    <Router>
      <Route exact path="/VVayfarer/" component={LoginPage} />
      <Route exact path="/VVayfarer/session" component={SessionSwitch} />
      <Route exact path="/VVayfarer/wrapper" component={AppWrapper} />
    </Router>
  );
}

export default App;
