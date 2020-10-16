import React, { useState } from "react";
import {
  Grid,
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";

import { LoginForm } from "./LoginForm.js";
import { RegisterForm } from "./RegisterForm.js";
import Image from "./background.jpg";

const useStyles = makeStyles((theme) => ({
  siteName: {
    color: "rgb(240, 243, 221)",
    fontWeight: "400",
    fontSize: "6vw",
  },

  leftBox: {
    display: "flex",
    alignItems: "flex-end",
    width: "50%",
    textAlign: "center",
    backgroundImage: "url(" + Image + ")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    paddingBottom: "10%",
  },

  rightBox: {
    display: "flex",
    alignItems: "center",
    minHeight: "100vh",
    width: "50%",
    textAlign: "center",
  },

  loginContainer: {
    direction: "column",
    paddingTop: "20px",
  },

  dialogStyle: {
    minWidth: "50%",
  },

  signUpButtonStyle: {
    fontSize: "1.1rem",
    backgroundColor: "#4caf50",
    "&:hover": {
      backgroundColor: "#81c784",
    },
  },
}));

export const LoginPage = () => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);

  let onCloseDialog = () => {
    setDialogOpen(false);
  };

  let leftBox = (
    <Box className={classes.leftBox}>
      <Grid container direction="column" spacing={2}>
        <Grid item className={classes.siteName}>
          VVayfarer
        </Grid>
      </Grid>
    </Box>
  );

  let rightBox = (
    <Box className={classes.rightBox}>
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
            variant="contained"
            color="primary"
            onClick={() => setDialogOpen(true)}
            className={classes.signUpButtonStyle}
          >
            Sign up
          </Button>
        </Grid>
        <Grid item>
          <ul>
            VVayfarer is a place where you can:
            <li>share photos from interesting places you have visited</li>
            <li>comment and react to other people photos</li>
            <li>find destination for your future excursions</li>
            <li>meet new people</li>
          </ul>
        </Grid>
      </Grid>
    </Box>
  );

  let registerDialog = (
    <Dialog open={dialogOpen}>
      <DialogTitle id="form-dialog-title">Create account</DialogTitle>
      <DialogContent className={classes.dialogStyle}>
        <RegisterForm onCloseDialog={onCloseDialog} />
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
