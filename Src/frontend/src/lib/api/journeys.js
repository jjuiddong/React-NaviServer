import client from "./client";
import qs from "qs";

export const listJourney = ({ page, username }) => {
  const queryString = qs.stringify({
    page,
    username,
  });
  return client.get(`/api/journeys?${queryString}`);
};

