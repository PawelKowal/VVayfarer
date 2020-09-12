import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const loginAttempt = createAsyncThunk(
  "user/loginAttempt",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", user);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: 0,
    isLogged: false,
    loginStatus: "idle",
    loginError: null,
    errorDialog: false,
  },
  reducers: {
    logoutAttempt(state, action) {
      state.userId = 0;
      state.isLogged = false;
      localStorage.removeItem("token");
    },
    authenticateTheUser(state, action) {
      state.isLogged = true;
      state.userId = action.payload;
    },
    errorDialogOpen(state, action) {
      state.errorDialog = action.payload;
      console.log("dispatched");
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
        state.loginError = action.payload.message;
        state.userId = 0;
        state.errorDialog = true;
      }
    },
  },
});

export const {
  logoutAttempt,
  errorDialogOpen,
  authenticateTheUser,
} = userSlice.actions;

export default userSlice.reducer;
