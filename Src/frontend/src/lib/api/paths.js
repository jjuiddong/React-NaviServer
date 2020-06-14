import client from "./client";
import qs from "qs";

export const listPath = ({ username, timeid }) => {
  const queryString = qs.stringify({
    username,
    timeid,
  });
  return client.get(`/api/paths?${queryString}`);
};
