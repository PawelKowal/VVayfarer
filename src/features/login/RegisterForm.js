import React from "react";
import { Grid, TextField } from "@material-ui/core";

export const RegisterForm = () => {
  return (
    <div>
      <form id="reg-form">
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <TextField
              type="text"
              label="First name"
              variant="filled"
            ></TextField>
          </Grid>
          <Grid item>
            <TextField
              type="text"
              label="Last name"
              variant="filled"
            ></TextField>
          </Grid>
          <Grid item>
            <TextField type="email" label="E-mail" variant="filled"></TextField>
          </Grid>
          <Grid item>
            <TextField
              type="password"
              label="Password"
              variant="filled"
            ></TextField>
          </Grid>
          <Grid item>
            <TextField
              type="password"
              label="Repeat password"
              variant="filled"
            ></TextField>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
