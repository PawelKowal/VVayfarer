import React, { useState } from "react";
import { Grid, Button, makeStyles } from "@material-ui/core";
import Input from "../../components/Input.js";
import { useDispatch } from "react-redux";
import { registerRequest, openDialog } from "./registerSlice";

/*let theme = createMuiTheme({
  spacing: 2,
});*/

const initialValues = {
  name: "",
  email: "",
  password: "",
  repeatedPassword: "",
};

const useStyles = makeStyles({
  button: {
    marginRight: "20px",
  },
  container: {
    alignItems: "center",
  },
});

export const RegisterForm = () => {
  const classes = useStyles();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  let dispatch = useDispatch();

  const validate = (values) => {
    let temp = { ...errors };
    if ("name" in values)
      temp.name = values.name ? "" : "This field is required.";
    if ("email" in values)
      temp.email = /.+@.+..+/.test(values.email) ? "" : "Email is not valid.";
    if ("password" in values)
      temp.password = /.{6,}/.test(values.password)
        ? ""
        : "Password must contain at least 6 characters.";
    if ("repeatedPassword" in values)
      temp.repeatedPassword =
        values.repeatedPassword === values.password
          ? ""
          : "Passwords are not the same.";
    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x == "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(values)) {
      dispatch(
        registerRequest({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      );
      dispatch(openDialog(false));
      resetForm();
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction="column"
        spacing={1}
        className={classes.container}
      >
        <Grid item>
          <Input
            name="name"
            label="Name"
            type="text"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
        </Grid>
        <Grid item>
          <Input
            name="email"
            label="E-mail"
            type="text"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
        </Grid>
        <Grid item>
          <Input
            type="password"
            name="password"
            label="Password"
            value={values.password}
            onChange={handleInputChange}
            error={errors.password}
          />
        </Grid>
        <Grid item>
          <Input
            type="password"
            name="repeatedPassword"
            label="Repeat password"
            value={values.repeatedPassword}
            onChange={handleInputChange}
            error={errors.repeatedPassword}
          />
        </Grid>
        <Grid item>
          <Button
            color="primary"
            variant="outlined"
            className={classes.button}
            onClick={() => dispatch(openDialog(false))}
          >
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="outlined">
            Sign up
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
