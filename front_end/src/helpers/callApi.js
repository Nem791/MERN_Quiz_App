import { _SERVER } from "../configs";

export default function callApi({ endpoint, method, reqData, token, queries }) {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const options = { method, headers };
  if (reqData) {
    options.body = JSON.stringify(reqData);
  }
  let query = "";
  if (queries) {
    query = Object.entries(queries)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    query = "?" + query;
  }
  return fetch(`${_SERVER}/${endpoint}${query}`, options);
}

export function handleResponse(res) {
  if (res.ok) return res.json();
  throw new Error(res.message);
}
