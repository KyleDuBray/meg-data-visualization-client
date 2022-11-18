import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("x-auth-token", token);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getNotifications: builder.mutation({
      query: (id) => ({
        url: `notifications/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetNotificationsMutation } = notificationApi;
