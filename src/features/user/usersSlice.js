import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { updateMockUser } from "../../mockApi/mockUsers";
import axios from "../../api/axios";

/*export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await axios.get("/api/users/");
  return response.data;
});*/

export const addNewUser = createAsyncThunk("user/addNewUser", async (user) => {
  const response = await axios.post("/api/auth/register", user);
  return response.data;
});

const usersAdapter = createEntityAdapter();

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({
    /*fetchUsersStatus: "idle",
    fetchUsersError: null,*/
    addNewUserStatus: "idle",
    addNewUserError: null,
  }),
  reducers: {
    updateUser(state, action) {
      const { id, profileDescription, image } = action.payload;
      usersAdapter.updateOne(state, {
        id,
        changes: { profileDescription, image },
      });
      updateMockUser(id, profileDescription, image);
    },
  },
  extraReducers: {
    /*[fetchUsers.pending]: (state, action) => {
      state.fetchUsersStatus = "loading";
      state.fetchUsersError = null;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      if (state.fetchUsersStatus === "loading") {
        usersAdapter.addMany(state, action);
        state.fetchUsersStatus = "succeeded";
      }
    },
    [fetchUsers.rejected]: (state, action) => {
      if (state.fetchUsersStatus === "loading") {
        state.fetchUsersStatus = "failed";
        state.fetchUsersError = action.payload;
      }
    },*/
    [addNewUser.pending]: (state, action) => {
      state.addNewUserStatus = "loading";
      state.addNewUserError = null;
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
        state.addNewUserError = action.payload.errors;
      }
    },
  },
});

export const { selectById: selectUserById } = usersAdapter.getSelectors(
  (state) => state.users
);

export const { updateUser } = usersSlice.actions;

export default usersSlice.reducer;
