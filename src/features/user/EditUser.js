import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Grid, Button, makeStyles } from "@material-ui/core";
import Input from "../../components/Input";
import ImageInput from "../../components/ImageInput";
import { updateUser, selectUserById } from "./usersSlice";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({});

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
    <Paper elevation={3}>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction="column"
          spacing={1}
          className={classes.container}
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
            {image && <img src={image} width="400" height="400" />}
          </Grid>

          <Grid item>
            <Button
              color="primary"
              variant="outlined"
              className={classes.button}
              onClick={resetForm}
            >
              Reset
            </Button>
            <Button type="submit" color="primary" variant="outlined">
              Update profile
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
