import React, { useState } from "react";
import {
  Grid,
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./LoginPage.css";

import { LoginForm } from "./LoginForm.js";
import { RegisterForm } from "./RegisterForm.js";

export const LoginPage = () => {
  const [signUpButtonState, signUpButtonClicked] = useState(false);

  let leftBox = (
    <Box className="leftBox">
      <Grid container direction="column" spacing={2}>
        <Grid item className="siteName">
          VVayfarer
        </Grid>
        <Grid item className="siteDescription">
          Welcome on my tourist social networking site.
        </Grid>
      </Grid>
    </Box>
  );

  let rightBox = (
    <Box className="rightBox">
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <LoginForm />
        </Grid>
        <Grid item>Don't have account?</Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => signUpButtonClicked(true)}
          >
            Sign up
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  let registerDialog = (
    <Dialog open={signUpButtonState} onClose={() => signUpButtonClicked(false)}>
      <DialogTitle id="form-dialog-title" className="dialogTitle">
        Create account
      </DialogTitle>
      <DialogContent>
        <RegisterForm />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => signUpButtonClicked(false)}
          color="primary"
          variant="outlined"
        >
          Sign up
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <React.Fragment>
      <Grid container direction="row">
        {leftBox}
        {rightBox}
      </Grid>
      {registerDialog}
    </React.Fragment>
  );
};
