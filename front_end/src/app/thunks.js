import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const backendApi = createApi({
  reducerPath: "backendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers, { getState }) => {
      // const token = getState().auth.token;
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getExploreSets: builder.query({ query: () => `quizzes/` }),
    getMyLibrary: builder.query({
      query: (params) => `filter-quiz/private/${params}`,
    }),
  }),
});

export const { useGetExploreSetsQuery, useGetMyLibraryQuery } = backendApi;
