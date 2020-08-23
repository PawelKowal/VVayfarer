import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectUserById, getUser } from "./userSlice";

export const User = () => {
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  const user = useSelector((state) => selectUserById(state, 1));
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(getUser(1));
    }
  }, [status, dispatch]);

  let content;

  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "succeeded") {
    content = <div>{user.firstName}</div>;
  } else if (status === "error") {
    content = <div>{error}</div>;
  }

  return <div>{content}</div>;
};
