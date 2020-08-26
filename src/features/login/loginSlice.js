import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { loginRequest } from "../../mockApi/mockUsers";

/*
  login={
      userId: 0,
      isLogged: false,
      error: false,
  }
   */

const loginSlice = createSlice({
  name: "login",
  initialState: {
    userId: 0,
    isLogged: false,
    error: false,
  },
  reducers: {
    loginAttempt(state, action) {
      const { email, password } = action.payload;
      const { token, userId } = loginRequest(email, password);
      if (token !== "invalid") {
        state.userId = userId;
        state.isLogged = true;
        localStorage.setItem("token", token);
      } else {
        state.error = true;
        state.userId = userId;
      }
    },
    logoutAttempt(state, action) {
      state.userId = 0;
      state.isLogged = false;
      localStorage.removeItem("token");
    },
    errorClosed(state, action) {
      state.error = false;
    },
    authenticateTheUser(state, action) {
      state.isLogged = true;
    },
  },
});

const { actions, reducers } = loginSlice;

export const {
  loginAttempt,
  logoutAttempt,
  errorClosed,
  authenticateTheUser,
} = loginSlice.actions;

export default loginSlice.reducer;
