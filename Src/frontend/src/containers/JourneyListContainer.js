import React, { useEffect } from "react";
import qs from "qs";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import JourneyList from "../components/JourneyList";
import { listJourney } from "../modules/journeys";

const JourneyListContainer = ({ location, match }) => {
  const dispatch = useDispatch();
  const { journeys, loading, curPage, lastPage, error } = useSelector(
    ({ journeys, loading }) => ({
      journeys: journeys.journeys,
      error: journeys.error,
      loading: loading["journeys/LIST_JOURNEY"],
      curPage: journeys.curPage,
      lastPage: journeys.lastPage,
    })
  );

  useEffect(() => {
    const { username } = match.params;
    const { page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listJourney({ username, page }));
  }, [dispatch, location.search, match.params]);

  return (
    <JourneyList
      loading={loading}
      journeys={journeys}
      curPage={curPage}
      lastPage={lastPage}
      error={error}
    ></JourneyList>
  );
};

export default withRouter(JourneyListContainer);
