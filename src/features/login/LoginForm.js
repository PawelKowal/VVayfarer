import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginAttempt, errorDialogOpen } from "../user/userSlice";

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    fontSize: "1.1rem",
    backgroundColor: "#4caf50",
    "&:hover": {
      backgroundColor: "#81c784",
    },
  },
}));

const initialValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const classes = useStyles();
  const [values, setValues] = useState(initialValues);
  const isLogged = useSelector((state) => state.user.isLogged);
  const errorDialog = useSelector((state) => state.user.errorDialog);
  const error = useSelector((state) => state.user.loginError);
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    if (isLogged) {
      history.push("/VVayfarer/wrapper");
    }
  });

  let handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAttempt(values));
  };

  return (
    <React.Fragment>
      <form id="login_form" onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={3}>
          <Grid item>Let's go on a trip!</Grid>
          <Grid item>
            <TextField
              type="email"
              name="email"
              label="E-mail"
              variant="filled"
              value={values["email"]}
              onChange={handleChange}
            ></TextField>
          </Grid>
          <Grid item>
            <TextField
              type="password"
              name="password"
              label="Password"
              variant="filled"
              value={values["password"]}
              onChange={handleChange}
            ></TextField>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.buttonStyle}
            >
              Sign in
            </Button>
          </Grid>
        </Grid>
      </form>
      <Dialog open={errorDialog}>
        <DialogTitle id="form-dialog-title" className="dialogTitle">
          {error}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => dispatch(errorDialogOpen(false))}
            variant="contained"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
