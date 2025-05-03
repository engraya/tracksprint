import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    }
  },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;