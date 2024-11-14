import { createSlice } from "@reduxjs/toolkit";
import LanguageProvider from "../lenguage/LanguageProvider";

const initialState = {
  language: "spa",
  texts: LanguageProvider.spa,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      state.texts = LanguageProvider[action.payload];
    },
    setTextsLeng: (state, action) => {
      state.texts = action.payload;
    },
  },
});

export const { setLanguage, setTextsLeng } = languageSlice.actions;
export default languageSlice.reducer;
