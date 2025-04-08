import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import languageReducer from "../features/languageSlice";
import { expoTokenSlice } from "../features/expoTokenSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    expoToken: expoTokenSlice.reducer,
  },
});
