import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const loginAttempt = createAsyncThunk(
  "user/loginAttempt",
  async (user) => {
    const response = await axios.post("/api/auth/login", user);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: 0,
    isLogged: false,
    loginStatus: "idle",
    loginError_: null,
    loginError: false,
  },
  reducers: {
    /*loginAttempt(state, action) {
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
    },*/
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
  extraReducers: {
    [loginAttempt.pending]: (state, action) => {
      state.loginStatus = "loading";
      state.loginError_ = null;
    },
    [loginAttempt.fulfilled]: (state, action) => {
      if (state.loginStatus === "loading") {
        //usersAdapter.addOne(state, action);
        state.loginStatus = "succeeded";
        localStorage.setItem("token", action.payload.message);
        state.userId = 1;
        state.isLogged = true;
      }
    },
    [loginAttempt.rejected]: (state, action) => {
      if (state.loginStatus === "loading") {
        state.loginStatus = "failed";
        state.loginError_ = action.payload.errors;
        state.loginError = true;
        state.userId = 0;
      }
    },
  },
});

export const {
  logoutAttempt,
  errorClosed,
  authenticateTheUser,
} = userSlice.actions;

export default userSlice.reducer;
