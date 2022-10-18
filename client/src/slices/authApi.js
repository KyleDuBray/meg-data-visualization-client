import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/auth",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      headers.set("Access-Control-Allow-Origin", "*");
      headers.set("x-auth-token", token);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTokenAuthStatus: builder.query({
      query: () => ``,
    }),
  }),
});

export const { useGetTokenAuthStatus } = authApi;
