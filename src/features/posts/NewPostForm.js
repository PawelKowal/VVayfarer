import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Grid, Button, makeStyles } from "@material-ui/core";
import { addPost } from "./postsSlice";
import Input from "../../components/Input";
import ImageInput from "../../components/ImageInput";

const initialValues = {
  postDescription: "",
  localisation: "",
};

const useStyles = makeStyles({});

export const NewPostForm = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialValues);
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const userId = useSelector((state) => state.user.userId);
  let dispatch = useDispatch();

  const validate = (values, image) => {
    let temp = { ...errors };
    if ("postDescription" in values)
      temp.postDescription = values.postDescription
        ? ""
        : "This field is required.";
    if ("localisation" in values)
      temp.localisation = values.localisation ? "" : "This field is required.";
    if (image)
      temp.image =
        "data:image" === image.slice(0, 10) ? "" : "Image is required.";

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
    } else {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate(values, image)) {
      dispatch(
        addPost({
          authorId: userId,
          postDate: new Date(),
          postDescription: values.postDescription,
          localisation: values.localisation,
          image: image,
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
              name="postDescription"
              label="Description"
              type="text"
              value={values.postDescription}
              onChange={handleInputChange}
              error={errors.postDescription}
              multiline={true}
              rows="4"
            />
          </Grid>
          <Grid item>
            <Input
              name="localisation"
              label="Localisation"
              type="text"
              value={values.localisation}
              onChange={handleInputChange}
              error={errors.localisation}
            />
          </Grid>
          <Grid item>
            <ImageInput
              name="image"
              label="Image"
              value={values.image}
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
              Add post
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
