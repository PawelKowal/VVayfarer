import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { authenticateTheUser } from "./features/user/userSlice.js";
import { initPosts } from "./mockApi/mockPosts";
import { initComments } from "./mockApi/mockComments";
import { fetchPosts } from "./features/posts/postsSlice";
import { fetchUsers } from "./features/user/usersSlice";
import { fetchComments } from "./features/comments/commentsSlice";

initPosts();
initComments();

const token = localStorage.getItem("token");
if (token) {
  store.dispatch(authenticateTheUser(token));
}

store.dispatch(fetchPosts());
/*store.dispatch(fetchUsers());*/
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
