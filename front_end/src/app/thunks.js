import { createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../helpers/callApi";
import { handleError, handleResponse } from "./helpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const LOGIN = createAsyncThunk("user/login", async (info) => {
  return await callApi({
    endpoint: "users/login",
    method: "POST",
    reqData: info,
  })
    .then(handleResponse)
    .catch(handleError);
});

export const SIGNUP = createAsyncThunk("user/register", async (info) => {
  return await callApi({
    endpoint: "users/register",
    method: "POST",
    reqData: info,
  })
    .then(handleResponse)
    .catch(handleError);
});

export const setsOnExploreApi = createApi({
  reducerPath: "setOnExploreApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getSetOnExplore: builder.query({ query: () => `quizzes/` }),
  }),
});

export const { useGetSetOnExploreQuery } = setsOnExploreApi;
