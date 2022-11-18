import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { authApi } from "./slices/authApi";
import projectReducer from "./slices/projectSlice";
import { projectApi } from "./slices/projectApi";
import notificationSlice from "./slices/notificationSlice";
import { notificationApi } from "./slices/notificationApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authApi: authApi.reducer,
    project: projectReducer,
    projectApi: projectApi.reducer,
    notification: notificationSlice,
    notificationApi: notificationApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
