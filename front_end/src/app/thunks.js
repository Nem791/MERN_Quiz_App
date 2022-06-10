import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const exploreSetsApi = createApi({
  reducerPath: "exploreSetsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getExploreSets: builder.query({ query: () => `quizzes/` }),
  }),
});

export const { useGetExploreSetsQuery } = exploreSetsApi;
