import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  isLoggedIn: !!localStorage.getItem("token"),
  uid : localStorage.getItem("uid") || null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.uid = action.payload.uid;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.uid = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
