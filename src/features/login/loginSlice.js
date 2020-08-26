import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { loginRequest } from "../../mockApi/mockUsers";

const loginAdapter = createEntityAdapter();

/*
  login={
      ids: [],
      entities: {
      },
      userId: 0,
      isLogged: false,
      error: false,
  }
   */

const loginSlice = createSlice({
  name: "login",
  initialState: loginAdapter.getInitialState({
    userId: 0,
    isLogged: false,
    error: false,
  }),
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

const loginSelectors = loginAdapter.getSelectors((state) => state.login);

export const {
  loginAttempt,
  logoutAttempt,
  errorClosed,
  authenticateTheUser,
} = loginSlice.actions;

export default loginSlice.reducer;
