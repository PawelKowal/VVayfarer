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

const usersAdapter = createEntityAdapter();

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({
    fetchUsersStatus: "idle",
    fetchUsersError: null,
    addNewUserStatus: "idle",
    addNewUserErrors: null,
  }),
  reducers: {
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
        /*usersAdapter.updateOne(state, {
          id,
          changes: { profileDescription, image },
        });*/
        state.updateUserStatus = "succeeded";
      }
    },
    [updateUser.rejected]: (state, action) => {
      if (state.updateUserStatus === "loading") {
        state.updateUserStatus = "failed";
        state.updateUserErrors = action.payload;
      }
    },
  },
});

export const { selectById: selectUserById } = usersAdapter.getSelectors(
  (state) => state.users
);

export const { resetAddNewUserErrors } = usersSlice.actions;

export default usersSlice.reducer;
