import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LoginPage } from "./features/login/LoginPage.js";
import { PostsList } from "./features/posts/PostsList.js";
import AppWrapper from "./AppWrapper.js";

function App() {
  return (
    <Router>
      <Route exact path="/VVayfarer/login" component={LoginPage} />
      <Route exact path="/VVayfarer/posts" component={PostsList} />
      <Route path="/VVayfarer/" component={AppWrapper} />
    </Router>
  );
}

export default App;
