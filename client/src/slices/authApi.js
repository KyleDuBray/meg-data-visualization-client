import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
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
    getTokenAuthStatus: builder.mutation({
      query: () => ({
        url: "auth",
        method: "GET",
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "users",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetTokenAuthStatusMutation,
  useRegisterMutation,
  useLoginMutation,
} = authApi;
