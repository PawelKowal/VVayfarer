import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "../../api/axios";
import { createJsonPatchDoc } from "../../api/createJsonPatchDoc";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await axios.get("/api/users/");
  return response.data;
});

export const addNewUser = createAsyncThunk(
  "users/addNewUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/register", user);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUser = createAsyncThunk("users/updateUser", async (data) => {
  const response = await axios.patch(
    "/api/user",
    createJsonPatchDoc(data.patchData),
    {
      params: {
        Id: data.UserId,
      },
    }
  );
});

export const loginAttempt = createAsyncThunk(
  "users/loginAttempt",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/auth/login", user);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchLoggedUser = createAsyncThunk(
  "users/fetchLoggedUser",
  async () => {
    const response = await axios.get("/api/user");
    return response.data;
  }
);

const usersAdapter = createEntityAdapter();

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({
    userId: 0,
    loginStatus: "idle",
    loginError: null,
    fetchLoggedUserStatus: "idle",
    fetchLoggedUserError: null,
    errorDialog: false,
    fetchUsersStatus: "idle",
    fetchUsersError: null,
    addNewUserStatus: "idle",
    addNewUserErrors: null,
  }),
  reducers: {
    logoutAttempt(state, action) {
      state.userId = 0;
      state.userName = "";
      state.image = "";
      state.profileDescription = "";
      localStorage.removeItem("token");
      state.loginStatus = "idle";
      state.fetchLoggedUserStatus = "idle";
    },
    errorDialogOpen(state, action) {
      state.errorDialog = action.payload;
    },
    resetAddNewUserErrors(state, action) {
      state.addNewUserErrors = null;
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.fetchUsersStatus = "loading";
      state.fetchUsersError = null;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      if (state.fetchUsersStatus === "loading") {
        usersAdapter.setAll(state, action);
        state.fetchUsersStatus = "succeeded";
      }
    },
    [fetchUsers.rejected]: (state, action) => {
      if (state.fetchUsersStatus === "loading") {
        state.fetchUsersStatus = "failed";
        state.fetchUsersError = action.payload;
      }
    },
    [addNewUser.pending]: (state, action) => {
      state.addNewUserStatus = "loading";
      state.addNewUserErrors = null;
    },
    [addNewUser.fulfilled]: (state, action) => {
      if (state.addNewUserStatus === "loading") {
        usersAdapter.addOne(state, action);
        state.addNewUserStatus = "succeeded";
      }
    },
    [addNewUser.rejected]: (state, action) => {
      if (state.addNewUserStatus === "loading") {
        state.addNewUserStatus = "failed";
        state.addNewUserErrors = action.payload.errors;
      }
    },
    [updateUser.pending]: (state, action) => {
      state.updateUserStatus = "loading";
      state.updateUserErrors = null;
    },
    [updateUser.fulfilled]: (state, action) => {
      if (state.updateUserStatus === "loading") {
        state.updateUserStatus = "succeeded";
      }
    },
    [updateUser.rejected]: (state, action) => {
      if (state.updateUserStatus === "loading") {
        state.updateUserStatus = "failed";
        state.updateUserErrors = action.payload;
      }
    },
    [loginAttempt.pending]: (state, action) => {
      state.loginStatus = "loading";
      state.loginError_ = null;
    },
    [loginAttempt.fulfilled]: (state, action) => {
      if (state.loginStatus === "loading") {
        state.loginStatus = "succeeded";
        localStorage.setItem("token", action.payload.message);
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
    [fetchLoggedUser.pending]: (state, action) => {
      state.fetchLoggedUserStatus = "loading";
      state.fetchLoggedUserError_ = null;
    },
    [fetchLoggedUser.fulfilled]: (state, action) => {
      if (state.fetchLoggedUserStatus === "loading") {
        state.fetchLoggedUserStatus = "succeeded";
        state.loginStatus = "succeeded";
        state.userId = action.payload.id;
        usersAdapter.addOne(state, action.payload);
      }
    },
    [fetchLoggedUser.rejected]: (state, action) => {
      if (state.fetchLoggedUserStatus === "loading") {
        state.fetchLoggedUserStatus = "failed";
        state.loginStatus = "failed";
        state.fetchLoggedUserError = action.payload;
        state.userId = 0;
        state.userName = "";
        state.image = "";
        state.profileDescription = "";
      }
    },
  },
});

export const { selectById: selectUserById } = usersAdapter.getSelectors(
  (state) => state.users
);

export const { resetAddNewUserErrors, logoutAttempt, errorDialogOpen } = usersSlice.actions;

export default usersSlice.reducer;
