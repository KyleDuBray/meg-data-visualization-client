import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: localStorage.token,
  user: null,
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
    setCredentials: (state, action) => {
      if (action.payload.user_id) {
        const { user_id, first_name, last_name, email, organization } =
          action.payload;
        state.user = { user_id, first_name, last_name, email, organization };
      }
    },
  },
});

export const { authenticate, setCredentials } = authSlice.actions;

export default authSlice.reducer;
