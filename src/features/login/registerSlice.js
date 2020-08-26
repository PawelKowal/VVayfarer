import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { registrationRequest } from "../../mockApi/mockUsers";

const registerAdapter = createEntityAdapter();

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

const registerSlice = createSlice({
  name: "register",
  initialState: registerAdapter.getInitialState({
    isValid: false,
  }),
  reducers: {
    validateRegistration(state, action) {
      state.isValid = true;
    },
    registerRequest(state, action) {
      registrationRequest(action.payload);
    },
  },
});

const registerSelectors = registerAdapter.getSelectors(
  (state) => state.register
);

export const { validateRegistration, registerRequest } = registerSlice.actions;

export default registerSlice.reducer;
