import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { registrationRequest } from "../../mockApi/mockUsers";

const registerAdapter = createEntityAdapter();

/*
  register={
    isValid: false,
  }
   */

const registerSlice = createSlice({
  name: "register",
  initialState: {
    isValid: false,
    dialogOpen: false,
  },
  reducers: {
    registerRequest(state, action) {
      state.isValid = true;
      registrationRequest(action.payload);
    },
    registrationDone(state, action) {
      state.isValid = false;
    },
    openDialog(state, action) {
      state.dialogOpen = action.payload;
    },
  },
});

export const {
  registrationDone,
  registerRequest,
  openDialog,
} = registerSlice.actions;

export default registerSlice.reducer;
