import { createSlice } from "@reduxjs/toolkit";
import { loginRequest } from "../../mockApi/mockUsers";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: 0,
    isLogged: false,
    loginError: false,
  },
  reducers: {
    loginAttempt(state, action) {
      const { email, password } = action.payload;
      const { token, userId } = loginRequest(email, password);
      if (token !== "invalid") {
        state.userId = userId;
        state.isLogged = true;
        localStorage.setItem("token", userId);
      } else {
        state.loginError = true;
        state.userId = userId;
      }
    },
    logoutAttempt(state, action) {
      state.userId = 0;
      state.isLogged = false;
      localStorage.removeItem("token");
    },
    errorClosed(state, action) {
      state.loginError = false;
    },
    authenticateTheUser(state, action) {
      state.isLogged = true;
      state.userId = action.payload;
    },
  },
});

export const {
  loginAttempt,
  logoutAttempt,
  errorClosed,
  authenticateTheUser,
} = userSlice.actions;

export default userSlice.reducer;
