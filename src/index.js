import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { authenticateTheUser } from "./features/user/userSlice.js";
import { initUsers } from "./mockApi/mockUsers";
import { initPosts } from "./mockApi/mockPosts";
import { initComments } from "./mockApi/mockComments";
import { fetchPosts } from "./features/posts/postsSlice";
import { fetchUsersData } from "./features/user/usersSlice";
import { fetchComments } from "./features/comments/commentsSlice";

initUsers();
initPosts();
initComments();

const token = localStorage.getItem("token");
if (token) {
  store.dispatch(authenticateTheUser(token));
}

store.dispatch(fetchPosts());
store.dispatch(fetchUsersData());
store.dispatch(fetchComments());

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
