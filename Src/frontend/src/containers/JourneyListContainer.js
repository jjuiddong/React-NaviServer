import React, { useEffect, useCallback } from "react";
import qs from "qs";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import JourneyList from "../components/JourneyList";
import { listJourney } from "../modules/journeys";
import { listPath, toggleShowPath } from "../modules/paths";

const JourneyListContainer = ({ location, match }) => {
  const dispatch = useDispatch();
  const { journeys, loading, curPage, lastPage, shows, error } = useSelector(
    ({ journeys, loading, paths }) => ({
      journeys: journeys.journeys,
      error: journeys.error,
      loading: loading["journeys/LIST_JOURNEY"],
      curPage: journeys.curPage,
      lastPage: journeys.lastPage,
      shows: paths.shows,
    })
  );

  // request journey list, initialize show flag
  useEffect(() => {
    const { username } = match.params;
    const { page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listJourney({ username, page }));
  }, [dispatch, location.search, match.params]);

  // show/hide journey path
  const onShowPath = useCallback(
    (event, data) => {
      const journey = journeys.find((item) => item.date === data.name);
      if (journey) {
        const timeid = journey.time_id;
        var show = true;
        if (shows.has(timeid) && shows.get(timeid)) {
          show = false;
        }
        if (show) {
          dispatch(listPath({ timeid }));
        }
        dispatch(toggleShowPath({ timeid }));
      } //~if journey
    },
    [dispatch, journeys, shows]
  );

  return (
    <JourneyList
      loading={loading}
      journeys={journeys}
      curPage={curPage}
      lastPage={lastPage}
      error={error}
      shows={shows}
      onShowPath={onShowPath}
    ></JourneyList>
  );
};

export default withRouter(JourneyListContainer);
