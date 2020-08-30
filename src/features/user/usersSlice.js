import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import {
  registrationRequest,
  getUsersMockData,
  updateMockUser,
} from "../../mockApi/mockUsers";

const usersAdapter = createEntityAdapter();

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {
    addNewUser(state, action) {
      const userId = registrationRequest(action.payload);
      const {
        name,
        email,
        password,
        image,
        profileDescription,
      } = action.payload;
      usersAdapter.addOne(state, {
        id: userId,
        name: name,
        image: image,
        profileDescription: profileDescription,
      });
    },
    fetchUsersData(state, action) {
      const usersData = getUsersMockData();
      usersAdapter.addMany(state, usersData);
    },
    updateUser(state, action) {
      const { id, profileDescription, image } = action.payload;
      usersAdapter.updateOne(state, {
        id,
        changes: { profileDescription, image },
      });
      updateMockUser(id, profileDescription, image);
    },
  },
});

export const { selectById: selectUserById } = usersAdapter.getSelectors(
  (state) => state.users
);

export const { addNewUser, fetchUsersData, updateUser } = usersSlice.actions;

export default usersSlice.reducer;
