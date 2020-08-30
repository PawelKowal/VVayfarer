import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Button, makeStyles } from "@material-ui/core";
import { addComment } from "./commentsSlice";
import Input from "../../components/Input";

const initialValues = {
  content: "",
};

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    fontSize: "1.1rem",
    backgroundColor: "#4caf50",
    "&:hover": {
      backgroundColor: "#81c784",
    },
  },
  textFieldStyle: {
    width: "60%",
  },
}));

export const AddCommentForm = (props) => {
  const classes = useStyles();
  const { postId } = props;
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const userId = useSelector((state) => state.user.userId);
  let dispatch = useDispatch();

  const validate = (values) => {
    let temp = { ...errors };
    if ("content" in values)
      temp.content = values.content ? "" : "This field is required.";

    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
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
        addComment({
          postId: postId,
          authorId: userId,
          commentDate: new Date().toISOString(),
          content: values.content,
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
    <div>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction="column"
          spacing={1}
          className={classes.container}
        >
          <Grid item>
            <Input
              name="content"
              label="Comment"
              type="text"
              value={values.content}
              onChange={handleInputChange}
              error={errors.content}
              multiline={true}
              rows="2"
              className={classes.textFieldStyle}
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.buttonStyle}
            >
              Add comment
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
