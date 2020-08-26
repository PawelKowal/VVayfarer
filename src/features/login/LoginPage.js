import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";

import { LoginForm } from "./LoginForm.js";
import { RegisterForm } from "./RegisterForm.js";

export const LoginPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const isValid = useSelector((state) => state.register.isValid);

  useEffect(() => {
    if (isValid) {
      setDialogOpen(false);
    }
  });

  let leftBox = (
    <Box className="leftBox">
      <Grid container direction="column" spacing={2}>
        <Grid item className="siteName">
          VVayfarer
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
        <Grid item>
          <div>Don't have account?</div>
          <div>You can use test account: 'test@mail.com'/'Password1.'</div>
          <div>Or:</div>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setDialogOpen(true)}
          >
            Sign up
          </Button>
        </Grid>
        <Grid item>
          <ul>
            VVayfarer is a place where you can:
            <li>share photos from interesting places you have visited</li>
            <li>find destination for your future excursions</li>
            <li>meet new people</li>
            <li>chat with friends</li>
          </ul>
        </Grid>
      </Grid>
    </Box>
  );

  let registerDialog = (
    <Dialog open={dialogOpen}>
      <DialogTitle id="form-dialog-title" className="dialogTitle">
        Create account
      </DialogTitle>
      <DialogContent className="dialogStyle">
        <RegisterForm />
      </DialogContent>
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
