import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Grid, Button, makeStyles } from "@material-ui/core";
import { addComment } from "./commentsSlice";
import Input from "../../components/Input";

const initialValues = {
  content: "",
};

const useStyles = makeStyles({});

export const AddCommentForm = (props) => {
  const { postId } = props;
  const classes = useStyles();
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
          commentDate: Date.now(),
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
              name="content"
              label="Comment"
              type="text"
              value={values.content}
              onChange={handleInputChange}
              error={errors.content}
              multiline={true}
              rows="2"
            />
          </Grid>
          <Grid item>
            <Button type="submit" color="primary" variant="outlined">
              Add comment
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
