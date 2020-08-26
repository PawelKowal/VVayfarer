import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Grid } from "@material-ui/core";
import { Posts } from "../posts/Posts";
import { UserProfile } from "../profile/UserProfile";
import { Chat } from "../chat/Chat";
import { logoutAttempt } from "../login/loginSlice.js";
import "./SessionSwitch.css";

export const SessionSwitch = () => {
  const isLogged = useSelector((state) => state.login.isLogged);
  const dispatch = useDispatch();
  let history = useHistory();
  useEffect(() => {
    if (!isLogged) {
      history.push("/VVayfarer/login");
    }
  });
  let signOutButtonClicked = () => {
    dispatch(logoutAttempt());
  };
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Grid container>
            <Grid item>
              <Typography variant="h6">News</Typography>
            </Grid>
            <Grid item sm>
              <div className="navbar">
                <Link to="/VVayfarer/profile">
                  <Button variant="outlined">Your profile</Button>
                </Link>
                <Link to="/VVayfarer/posts">
                  <Button color="inherit" variant="outlined">
                    Check posts
                  </Button>
                </Link>
                <Link to="/VVayfarer/chat">
                  <Button color="inherit" variant="outlined">
                    Chat with friends
                  </Button>
                </Link>
              </div>
            </Grid>
            <Grid item>
              <Button
                color="inherit"
                variant="outlined"
                onClick={signOutButtonClicked}
              >
                Sign out
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route path="/VVayfarer/posts">
          <Posts />
        </Route>
        <Route path="/VVayfarer/profile">
          <UserProfile />
        </Route>
        <Route path="/VVayfarer/chat">
          <Chat />
        </Route>
      </Switch>
    </Router>
  );
};
