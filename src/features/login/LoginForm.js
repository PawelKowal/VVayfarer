import React, { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "./LoginForm.css";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setters = {
    email: setEmail,
    password: setPassword,
  };

  let handleChange = (e) => {
    setters[e.target.name](e.target.value);
  };

  let handleSubmit = (e) => {
    console.log("submitted");
  };

  return (
    <form
      id="login_form"
      onSubmit={() => {
        console.log("XD");
      }}
    >
      <Grid container direction="column" spacing={3}>
        <Grid item>Let's go on a trip!</Grid>
        <Grid item>
          <TextField
            type="email"
            name="email"
            label="E-mail"
            variant="filled"
            value={email}
            onChange={handleChange}
          ></TextField>
        </Grid>
        <Grid item>
          <TextField
            type="password"
            name="email"
            label="Password"
            variant="filled"
            value={password}
            onChange={handleChange}
          ></TextField>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="primary">
            Sign in
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
