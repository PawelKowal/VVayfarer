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

export const getLoggedUserId = createAsyncThunk(
  "user/getLoggedUserId",
  async () => {
    const response = await axios.get("/api/user");
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: 0,
    isLogged: false,
    loginStatus: "idle",
    loginError: null,
    getLoggedUserIdStatus: "idle",
    getLoggedUserIdError: null,
    errorDialog: false,
  },
  reducers: {
    logoutAttempt(state, action) {
      state.userId = 0;
      state.isLogged = false;
      localStorage.removeItem("token");
    },
    errorDialogOpen(state, action) {
      state.errorDialog = action.payload;
    },
  },
  extraReducers: {
    [loginAttempt.pending]: (state, action) => {
      state.loginStatus = "loading";
      state.loginError_ = null;
    },
    [loginAttempt.fulfilled]: (state, action) => {
      if (state.loginStatus === "loading") {
        state.loginStatus = "succeeded";
        localStorage.setItem("token", action.payload.message);
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
    [getLoggedUserId.pending]: (state, action) => {
      state.getLoggedUserIdStatus = "loading";
      state.getLoggedUserIdError_ = null;
    },
    [getLoggedUserId.fulfilled]: (state, action) => {
      if (state.getLoggedUserIdStatus === "loading") {
        state.getLoggedUserIdStatus = "succeeded";
        state.userId = action.payload.id;
        state.isLogged = true;
      }
    },
    [getLoggedUserId.rejected]: (state, action) => {
      if (state.getLoggedUserIdStatus === "loading") {
        state.getLoggedUserIdStatus = "failed";
        state.getLoggedUserIdError = action.payload;
        state.userId = 0;
        state.isLogged = false;
      }
    },
  },
});

export const { logoutAttempt, errorDialogOpen } = userSlice.actions;

export default userSlice.reducer;
