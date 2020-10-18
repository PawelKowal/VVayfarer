import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { fetchLoggedUser, setLoginStatus } from "./features/user/usersSlice";
import { updateAuthorizationHeader } from "./api/axios";

//initPosts();
//initComments();
//initUsers();

updateAuthorizationHeader();

if (localStorage.getItem("token")) {
  store.dispatch(setLoginStatus("succeeded"));
  console.log("index fetch");
  store.dispatch(fetchLoggedUser());
}

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <App />
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
