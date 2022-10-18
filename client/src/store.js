import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { authApi } from "./slices/authApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authApi: authApi.reducer,
  },
});
