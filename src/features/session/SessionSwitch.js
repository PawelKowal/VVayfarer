import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Grid,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import ForumIcon from "@material-ui/icons/Forum";
import { Posts } from "../posts/Posts";
import { UserProfile } from "../profile/UserProfile";
import { Chat } from "../chat/Chat";
import { logoutAttempt } from "../user/userSlice.js";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#5d9f10",
  },
  iconsDiv: {
    display: "flex",
    justifyContent: "center",
    "& .MuiIconButton-root": {
      marginRight: theme.spacing(8),
      marginLeft: theme.spacing(8),
      color: "rgb(240, 255, 255)",
    },
  },
  container: {
    display: "flex",
    alignItems: "center",
  },
  logOutButton: {
    color: "rgb(240, 255, 255)",
    border: "2px solid rgb(240, 255, 255)",
    fontSize: "1.1rem",
    fontWeight: 700,
    padding: "3px 10px",
  },
  siteName: {
    fontWeight: 500,
    fontSize: "1.7rem",
  },
}));

export const SessionSwitch = () => {
  const classes = useStyles();
  const isLogged = useSelector((state) => state.user.isLogged);
  const [siteName, setSiteName] = useState("Profile");
  const dispatch = useDispatch();
  let history = useHistory();

  let signOutButtonClicked = () => {
    dispatch(logoutAttempt());
    history.push("/VVayfarer/login");
  };
  return (
    <Router>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Grid container className={classes.container}>
            <Grid item xs={1}>
              <Typography variant="h5" className={classes.siteName}>
                {siteName}
              </Typography>
            </Grid>
            <Grid item sm>
              <div className={classes.iconsDiv}>
                <Link to="/VVayfarer/profile">
                  <IconButton onClick={() => setSiteName("Profile")}>
                    <AccountBoxIcon fontSize="large" />
                  </IconButton>
                </Link>
                <Link to="/VVayfarer/posts">
                  <IconButton onClick={() => setSiteName("Posts")}>
                    <LibraryBooksIcon fontSize="large" />
                  </IconButton>
                </Link>
                <Link to="/VVayfarer/chat">
                  <IconButton onClick={() => setSiteName("Chat")}>
                    <ForumIcon fontSize="large" />
                  </IconButton>
                </Link>
              </div>
            </Grid>
            <Grid item xs={1}>
              <Button
                className={classes.logOutButton}
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
        <Route path="/VVayfarer/chat">
          <Chat />
        </Route>
        <Route path="/VVayfarer/">
          <UserProfile />
        </Route>
      </Switch>
    </Router>
  );
};
