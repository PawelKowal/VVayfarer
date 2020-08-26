import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import Input from "../../components/Input.js";
import { useDispatch } from "react-redux";
import { validateRegistration, registerRequest } from "./registerSlice";

const initialValues = {
  name: "",
  email: "",
  password: "",
  repeatedPassword: "",
};

export const RegisterForm = () => {
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
        : "Password not valid.";
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
      dispatch(validateRegistration());
      dispatch(
        registerRequest({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      );
      resetForm();
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={1}>
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
        </Grid>
        <Button type="submit" color="primary" variant="outlined">
          Sign up
        </Button>
      </form>
    </div>
  );
};
