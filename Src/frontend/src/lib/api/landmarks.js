import client from "./client";
import qs from "qs";

export const listLandmark = ({ page, username }) => {
  const queryString = qs.stringify({
    page,
    username,
  });
  return client.get(`/api/landmarks?${queryString}`);
};

