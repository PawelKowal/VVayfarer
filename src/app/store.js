import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import loginReducer from "../features/login/loginSlice";
import registerReducer from "../features/login/registerSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    login: loginReducer,
    register: registerReducer,
  },
});
