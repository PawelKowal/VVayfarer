import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Grid, Button, makeStyles } from "@material-ui/core";
import Input from "../../components/Input";
import ImageInput from "../../components/ImageInput";
import { updateUser, selectUserById } from "./usersSlice";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: "#e0e0e0",
  },
  feedBackgroundStyle: {
    display: "flex",
    width: "50vw",
    "& > *": {
      margin: "4px 5% 4px 5%",
    },
    marginTop: "8px",
    marginBottom: "8px",
    justifyContent: "center",
    alignItems: "center",
  },
  gridContainerStyle: {},
  buttonUpdateStyle: {
    fontSize: "1.1rem",
    backgroundColor: "#4caf50",
    marginRight: "10px",
    marginLeft: "10px",
    "&:hover": {
      backgroundColor: "#81c784",
    },
  },
  buttonResetStyle: {
    fontSize: "1.1rem",
    backgroundColor: "#9e9e9e",
    marginRight: "10px",
    marginLeft: "10px",
    "&:hover": {
      backgroundColor: "#bdbdbd",
    },
  },
  textFieldStyle: {
    width: "100%",
  },
}));

export const EditUser = (props) => {
  const { image_, profileDescription_ } = props;
  const classes = useStyles();
  const userId = useSelector((state) => state.user.userId);
  const userData = useSelector((state) => selectUserById(state, userId));
  const [profileDescription, setProfileDescription] = useState(
    userData.profileDescription
  );
  const [image, setImage] = useState(userData.image);
  const [errors, setErrors] = useState({});

  let dispatch = useDispatch();
  let history = useHistory();

  const validate = () => {
    let temp = { ...errors };
    temp.profileDescription = "";
    if (image) {
      temp.image =
        "data:image" === image.slice(0, 10) ? "" : "Wrong file format.";
    }

    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      if (e.target.files && e.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    }
    if (e.target.name === "profileDescription") {
      setProfileDescription(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(
        updateUser({
          id: userId,
          profileDescription: profileDescription,
          image: image,
        })
      );
      resetForm();
      history.push("/VVayfarer/");
    }
  };

  const resetForm = () => {
    setImage("");
    setProfileDescription("");
    setErrors({});
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.feedBackgroundStyle}>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            direction="column"
            spacing={1}
            className={classes.gridContainerStyle}
          >
            <Grid item>
              <Input
                name="profileDescription"
                label="Profile description"
                type="text"
                value={profileDescription}
                onChange={handleInputChange}
                error={errors.profileDescription}
                multiline={true}
                rows="4"
                className={classes.textFieldStyle}
              />
            </Grid>
            <Grid item>
              <ImageInput
                name="image"
                label="Image"
                onChange={handleInputChange}
                error={errors.image}
              />
            </Grid>
            <Grid item>
              {image && <img src={image} width="80%" height="auto" />}
            </Grid>

            <Grid item>
              <Button
                color="primary"
                variant="contained"
                className={classes.buttonResetStyle}
                onClick={resetForm}
              >
                Reset
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.buttonUpdateStyle}
              >
                Update profile
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};
