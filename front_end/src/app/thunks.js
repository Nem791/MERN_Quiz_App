import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import callApi, { handleResponse } from "../helpers/callApi";
import { FAKE_DELETE } from "./uiSlice";

export const backendApi = createApi({
  reducerPath: "backendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    // baseUrl: "https://quiz-app-791.herokuapp.com",
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
    getSearchResults: builder.query({
      query: (params) => {
        return `filter-quiz/search/${params}`;
      },
    }),
  }),
});

export const DELETE_MY_SET = (id) => (dispatch) => {
  callApi({
    endpoint: `quizzes/soft-delete-quiz-set/${id}`,
    method: "DELETE",
    token: localStorage.getItem("token"),
  })
    .then(handleResponse)
    .then(() => dispatch(FAKE_DELETE(id)))
    .catch(console.log);
};

export const {
  useGetExploreSetsQuery,
  useGetMyLibraryQuery,
  useGetSearchResultsQuery,
} = backendApi;
