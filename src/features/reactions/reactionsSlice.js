import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
//import {} from "../../mockApi/mockreactions";

const reactionsAdapter = createEntityAdapter();

const reactionsSlice = createSlice({
  name: "reactions",
  initialState: reactionsAdapter.getInitialState(),
  reducers: {},
});

export const {} = reactionsAdapter.getSelectors((state) => state.reactions);

export const {} = reactionsSlice.actions;

export default reactionsSlice.reducer;
