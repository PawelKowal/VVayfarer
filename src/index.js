import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { initPosts } from "./mockApi/mockPosts";
import { initComments } from "./mockApi/mockComments";
import { fetchPosts } from "./features/posts/postsSlice";
import { fetchUsers } from "./features/user/usersSlice";
import { fetchComments } from "./features/comments/commentsSlice";
import axios from "./api/axios";

initPosts();
initComments();

axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

store.dispatch(fetchPosts());
store.dispatch(fetchUsers());
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
