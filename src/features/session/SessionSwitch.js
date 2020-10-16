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
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Posts } from "../posts/Posts";
import { UserProfile } from "../profile/UserProfile";
import { EditUser } from "../user/EditUser";
import { PostAuthorProfile } from "../profile/PostAuthorProfile";
import { logoutAttempt, getLoggedUserId } from "../user/userSlice.js";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#4caf50",
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
  logOutIcon: {
    color: "rgb(240, 255, 255)",
  },
  siteName: {
    fontWeight: 500,
    fontSize: "1.7rem",
  },
}));

export const SessionSwitch = () => {
  const classes = useStyles();
  const isLogged = useSelector((state) => state.user.isLogged);
  const [siteName, setSiteName] = useState("Welcome");
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    dispatch(getLoggedUserId());
  });

  useEffect(() => {
    if (!isLogged) {
      history.push("/VVayfarer/");
    }
  }, [isLogged, history]);

  let signOutButtonClicked = () => {
    dispatch(logoutAttempt());
    history.push("/VVayfarer/");
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
              </div>
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={signOutButtonClicked}>
                <ExitToAppIcon
                  fontSize="large"
                  className={classes.logOutIcon}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <Switch>
          <Route path="/VVayfarer/posts" component={Posts} />
          <Route path="/VVayfarer/user" component={PostAuthorProfile} />
          <Route path="/VVayfarer/editUser" component={EditUser} />
          <Route path="/VVayfarer/profile" component={UserProfile} />
        </Switch>
      </div>
    </Router>
  );
};
