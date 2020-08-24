import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { User } from "./features/user/User";
import { LoginPage } from "./features/login/LoginPage.js";
import { PostsList } from "./features/posts/PostsList.js";
import { RegisterForm } from "./features/login/RegisterForm.js";

function App() {
  return (
    <Router>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/posts" component={PostsList} />
    </Router>
  );
}

export default App;
