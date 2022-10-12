import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./slices/registrationSlice";

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
  },
});
