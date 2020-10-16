import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles, Paper, Button, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import { User } from "../user/User";
import { Link } from "react-router-dom";
import { fetchUsers } from "./../user/usersSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: "#e0e0e0",
    "& > *": {
      margin: theme.spacing(2),
    },
  },
  feedBackgroundStyle: {
    width: "50vw",
  },
  gridContainerStyle: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  buttonStyle: {
    fontSize: "1.1rem",
    backgroundColor: "#4caf50",
    "&:hover": {
      backgroundColor: "#81c784",
    },
  },
}));

export const UserProfile = () => {
  const classes = useStyles();
  const userId = useSelector((state) => state.user.userId);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  });

  return (
    <div className={classes.root}>
      <Paper className={classes.feedBackgroundStyle} elevation={3}>
        <Grid
          container
          direction="column"
          className={classes.gridContainerStyle}
        >
          <Grid item>
            <User id={userId} />
          </Grid>
          <Grid item className={classes.gridContainerStyle}>
            <Link to={"/VVayfarer/editUser"}>
              <Button
                variant="contained"
                color="primary"
                className={classes.buttonStyle}
              >
                Edit profile
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
