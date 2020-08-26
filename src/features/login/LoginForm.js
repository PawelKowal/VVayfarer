import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./LoginForm.css";
import { loginAttempt, errorClosed } from "./loginSlice";

const initialValues = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const [values, setValues] = useState(initialValues);
  const isLogged = useSelector((state) => state.login.isLogged);
  const error = useSelector((state) => state.login.error);
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    if (isLogged) {
      history.push("/VVayfarer/posts");
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
            <Button variant="outlined" color="primary" type="submit">
              Sign in
            </Button>
          </Grid>
        </Grid>
      </form>
      <Dialog open={error} onClose={() => dispatch(errorClosed())}>
        <DialogTitle id="form-dialog-title" className="dialogTitle">
          Invalid email or password.
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => dispatch(errorClosed())}
            color="primary"
            variant="outlined"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
