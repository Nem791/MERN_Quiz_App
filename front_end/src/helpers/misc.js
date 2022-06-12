import { _SERVER } from "../configs";

export const imgLink = (end, type = "png") =>
  `https://cf.quizizz.com/img/${end}.${type}`;

export const backendImg = (url) =>
  url.slice(0, 4) === "http" ? url : _SERVER + url;
