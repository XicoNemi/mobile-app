import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import languageReducer from "../features/languageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
  },
});
