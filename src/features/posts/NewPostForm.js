import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Grid, Button, makeStyles } from "@material-ui/core";
import { addPost } from "./postsSlice";
import Input from "../../components/Input";
import ImageInput from "../../components/ImageInput";

const initialValues = {
  postDescription: "",
  location: "",
};

const useStyles = makeStyles({
  root: {
    "& > *": {
      margin: "0 5% 4px 5%",
    },
    marginTop: "8px",
    marginBottom: "8px",
  },
  buttonAddStyle: {
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
    width: "70%",
  },
});

export const NewPostForm = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState(initialValues);
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const userId = useSelector((state) => state.user.userId);
  let dispatch = useDispatch();

  const validate = (values) => {
    let temp = { ...errors };
    if ("postDescription" in values)
      temp.postDescription = values.postDescription
        ? ""
        : "This field is required.";
    if ("location" in values)
      temp.location = values.location ? "" : "This field is required.";

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
    if (validate(values)) {
      dispatch(
        addPost({
          authorId: userId,
          postDate: new Date().toISOString(),
          postDescription: values.postDescription,
          location: values.location,
          image: image,
          reactsAmount: 0,
          reactsAuthors: [],
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
    <Paper elevation={3} className={classes.root}>
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
              className={classes.textFieldStyle}
            />
          </Grid>
          <Grid item>
            <Input
              name="location"
              label="Location"
              type="text"
              value={values.location}
              onChange={handleInputChange}
              error={errors.location}
              className={classes.textFieldStyle}
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
            {image && <img src={image} width="40%" height="auto" />}
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
              className={classes.buttonAddStyle}
            >
              Add post
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
