import React, { useState } from "react";
import { Grid, Button, Box, Input, TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./LoginPage.css";

import { LoginForm } from "./LoginForm.js";
import { RegisterForm } from "./RegisterForm.js";

export const LoginPage = () => {
  const [signUpButtonState, signUpButtonClicked] = useState(false);

  let leftBox = (
    <Box className="leftBox">
      <Grid container direction="column">
        <Grid item>
          <h1>VVayfarer</h1>
        </Grid>
        <Grid item>
          <h2>Welcome on my tourist social networking site.</h2>
        </Grid>
      </Grid>
    </Box>
  );

  let rightBox = (
    <Box className="rightBox">
      <Grid container direction="column" spacing={3}>
        <Grid item>Let's go on a trip!</Grid>
        <LoginForm />
        <Grid item>Don't have account?</Grid>
        <Grid item>
          <Button variant="outlined" color="primary">
            Sign up
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <React.Fragment>
      <Grid container direction="row">
        {leftBox}
        {rightBox}
      </Grid>
    </React.Fragment>
  );
};
