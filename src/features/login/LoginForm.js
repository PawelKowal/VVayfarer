import React from "react";
import { Grid, Input, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  return (
    <>
      <Grid item>
        <TextField type="email" placeholder="email"></TextField>
      </Grid>
      <Grid item>
        <Input type="password" placeholder="password"></Input>
      </Grid>
      <Grid item>
        <Link to="/posts">
          <Button variant="outlined" color="primary">
            Sign in
          </Button>
        </Link>
      </Grid>
    </>
  );
};
