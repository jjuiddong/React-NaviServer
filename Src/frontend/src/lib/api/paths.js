import client from "./client";
import qs from "qs";

export const listPath = ({ username, timeid, date }) => {
  const queryString = qs.stringify({
    username,
    timeid,
    date,
  });
  return client.get(`/api/paths?${queryString}`);
};

export const listTodayPath = ({ time }) => {
  const queryString = qs.stringify({
    time,
  });
  return client.get(`/api/paths/today?${queryString}`);
};
