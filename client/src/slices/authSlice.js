import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokenFromLocal: (state, action) => {
      if (localStorage.token) {
        state.token = localStorage.token;
      } else {
        console.log("No token found, authentication needed.");
      }
    },
    setCredentials: (state, action) => {
      if (!action.payload) state.user = null;
      state.user = action.payload;
    },
    logout: (state, action) => {
      localStorage.token = null;
      state.user = null;
      state.token = null;
    },
  },
});

export const { setTokenFromLocal, setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
