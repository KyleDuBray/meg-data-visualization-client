import { createSlice } from "@reduxjs/toolkit";
import setAuthToken from "../utilities/setAuthToken";

const initialState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
    },
  },
});

export const { authenticate } = authSlice.actions;

export default authSlice.reducer;
