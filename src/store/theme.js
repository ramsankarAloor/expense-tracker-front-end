import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkTheme : false
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
   toggleTheme(state){
    state.darkTheme = !state.darkTheme
   }
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
