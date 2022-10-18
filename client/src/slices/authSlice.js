import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      if (localStorage.token) {
        console.log(localStorage.token);
        state.isAuthenticated = true;
      } else {
        console.log("No token found, authentication needed.");
        state.isAuthenticated = false;
      }
    },
  },
});

export const { authenticate } = authSlice.actions;

export default authSlice.reducer;
