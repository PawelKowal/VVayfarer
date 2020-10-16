import React, { useState, useEffect } from "react";
import { Grid, Button, makeStyles } from "@material-ui/core";
import Input from "../../components/Input.js";
import { useDispatch, useSelector } from "react-redux";
import { addNewUser, resetAddNewUserErrors } from "../user/usersSlice";

const initialValues = {
  name: "",
  email: "",
  password: "",
  repeatedPassword: "",
};

const initialErrors = {
  nameErrors: [],
  emailErrors: [],
  passwordErrors: [],
  repeatedPasswordErrors: [],
  otherErrors: [],
};

const initialErrorsList = {
  nameErrors: "",
  emailErrors: "",
  passwordErrors: "",
  repeatedPasswordErrors: "",
  otherErrors: "",
};

const useStyles = makeStyles({
  buttonSignUp: {
    backgroundColor: "#4caf50",
    marginRight: "10px",
    marginLeft: "10px",
    "&:hover": {
      backgroundColor: "#81c784",
    },
  },
  buttonCancel: {
    backgroundColor: "#9e9e9e",
    marginRight: "10px",
    marginLeft: "10px",
    "&:hover": {
      backgroundColor: "#bdbdbd",
    },
  },
  buttonsContainer: {
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
  },
  errorList: {
    marginLeft: "0",
    paddingLeft: "1vw",
    marginTop: "0",
    paddingTop: "0",
    marginBottom: "0",
    paddingBottom: "0",
  },
});

export const RegisterForm = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialValues);
  const [errorsKeysArr, setErrorsKeysArr] = useState(initialErrors);
  const [errorsList, setErrorsList] = useState(initialErrorsList);
  const registerStatus = useSelector((state) => state.users.addNewUserStatus);
  const responseErrors = useSelector((state) => state.users.addNewUserErrors);
  let dispatch = useDispatch();

  function isMatching(regexp) {
    return (str) => regexp.test(str);
  }
  function isNotMatching(regexp) {
    return (str) => !regexp.test(str);
  }

  useEffect(() => {
    if (registerStatus === "succeeded") {
      resetForm();
      props.onCloseDialog();
    }
  }, [registerStatus]);

  useEffect(() => {
    if (responseErrors) {
      let keys = Object.keys(responseErrors);
      let errorsKeys = {};
      errorsKeys["emailErrors"] = keys.filter(isMatching(/email|Email/));
      errorsKeys["nameErrors"] = keys.filter(isMatching(/name|Name/));
      errorsKeys["passwordErrors"] = keys.filter(
        isMatching(/password|Password/)
      );
      errorsKeys["repeatedPasswordErrors"] = keys.filter(
        isMatching(/confirmPassword/)
      );
      errorsKeys["otherErrors"] = keys.filter(
        isNotMatching(/email|Email|name|Name|password|Password|confirmPassword/)
      );
      setErrorsKeysArr(errorsKeys);
    }
  }, [responseErrors]);

  useEffect(() => {
    let errors = {};
    for (const keysArr in errorsKeysArr) {
      if (errorsKeysArr[keysArr].length > 0) {
        errors[keysArr] = (
          <ul className={classes.errorList}>
            {errorsKeysArr[keysArr].map((x) => {
              return <li key={x}>{responseErrors[x][0]}</li>;
            })}
          </ul>
        );
      }
    }
    setErrorsList(errors);
  }, [errorsKeysArr]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addNewUser({
        UserName: values.name,
        Email: values.email,
        Password: values.password,
        ConfirmPassword: values.repeatedPassword,
      })
    );
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrorsKeysArr(initialErrors);
    setErrorsList(initialErrorsList);
    dispatch(resetAddNewUserErrors());
  };

  const handleCloseButton = () => {
    resetForm();
    props.onCloseDialog();
  };

  return (
    <React.Fragment>
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
              error={errorsList["nameErrors"]}
            />
          </Grid>
          <Grid item>
            <Input
              name="email"
              label="E-mail"
              type="text"
              value={values.email}
              onChange={handleInputChange}
              error={errorsList["emailErrors"]}
            />
          </Grid>
          <Grid item>
            <Input
              type="password"
              name="password"
              label="Password"
              value={values.password}
              onChange={handleInputChange}
              error={errorsList["passwordErrors"]}
            />
          </Grid>
          <Grid item>
            <Input
              type="password"
              name="repeatedPassword"
              label="Repeat password"
              value={values.repeatedPassword}
              onChange={handleInputChange}
              error={errorsList["repeatedPasswordErrors"]}
            />
          </Grid>
          <Grid item className={classes.buttonsContainer}>
            <Button
              color="primary"
              variant="contained"
              className={classes.buttonCancel}
              onClick={handleCloseButton}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.buttonSignUp}
            >
              Sign up
            </Button>
          </Grid>
          <Grid item>{errorsList["otherErrors"]}</Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
};
