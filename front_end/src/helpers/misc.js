import { _IMG_BASE_URL } from "../configs";

export const imgLink = (end, type) =>
  `https://cf.quizizz.com/img/${end}.${type || "png"}`;

export const renderBackendImg = (url) => {
  if (url.slice(0, 4) === "http") {
    return url;
  }
  return _IMG_BASE_URL + url;
};
