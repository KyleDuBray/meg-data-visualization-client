import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectApi = createApi({
  reducerPath: "projectApi",
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
    getProjects: builder.mutation({
      query: () => ({
        url: `projects`,
        method: "GET",
      }),
    }),
    getUsersForProject: builder.mutation({
      query: (id) => ({
        url: `projects/users/${id}`,
        method: "GET",
      }),
    }),
    createProject: builder.mutation({
      query: (name) => ({
        url: `projects`,
        method: "POST",
        body: { project_name: name },
      }),
    }),
    addUserToProject: builder.mutation({
      query: (name) => ({
        url: `projects`,
        method: "POST",
        body: { project_name: name },
      }),
    }),
  }),
});

export const {
  useGetProjectsMutation,
  useGetUsersForProjectMutation,
  useCreateProjectMutation,
} = projectApi;
