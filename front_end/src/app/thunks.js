import { createAsyncThunk } from "@reduxjs/toolkit";
import callApi from "../helpers/callApi";
import { handleError, handleResponse } from "./helpers";

export const LOGIN = createAsyncThunk("user/login", async (info) => {
  return await callApi({
    endpoint: "/users/login",
    method: "POST",
    reqData: info
  })
    .then(handleResponse)
    .catch(handleError);
});

export const SIGNUP = createAsyncThunk("user/signup", async (info) => {
  return await callApi({
    endpoint: "/users",
    method: "POST",
    reqData: info
  })
    .then(handleResponse)
    .catch(handleError);
});
