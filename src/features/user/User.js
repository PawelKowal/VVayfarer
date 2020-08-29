import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { Paper } from "@material-ui/core";

export const User = (props) => {
  const { id } = props;
  const userData = useSelector((state) => selectUserById(state, id));
  return (
    <Paper elevation={3}>
      <div>{userData.name}</div>
      <div>
        {userData.image && (
          <img src={userData.image} width="400" height="400" />
        )}
      </div>
    </Paper>
  );
};
