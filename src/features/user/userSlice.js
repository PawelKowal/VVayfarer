import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "../../api/axios";

export const getUser = createAsyncThunk("user/getUser", async (userId) => {
  const response = await axios.get("/api/users/" + userId);
  return response.data;
});

const userAdapter = createEntityAdapter();

const userSlice = createSlice({
  name: "user",
  initialState: userAdapter.getInitialState({
    status: "idle",
    error: null,
  }),
  reducers: {
    userLoaded: userAdapter.setAll,
  },
  extraReducers: {
    [getUser.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [getUser.fulfilled]: (state, action) => {
      if (state.status === "loading") {
        userAdapter.upsertOne(state, action);
        state.status = "succeeded";
      }
    },
    [getUser.rejected]: (state, action) => {
      if (state.status === "loading") {
        state.status = "failed";
        state.error = action.payload;
      }
    },
  },
});

export const { userLoaded } = userSlice.actions;

export const { selectById: selectUserById } = userAdapter.getSelectors(
  (state) => state.user
);

export default userSlice.reducer;
