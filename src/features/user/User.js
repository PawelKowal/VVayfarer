import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { Paper } from "@material-ui/core";

export const User = () => {
  const userId = useSelector((state) => state.user.userId);
  const userData = useSelector((state) => selectUserById(state, userId));
  return <Paper elevation={3}>{userData.name}</Paper>;
};
