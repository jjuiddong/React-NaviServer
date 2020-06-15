import React, { useState, useEffect, useCallback } from "react";
import qs from "qs";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import JourneyList from "../components/JourneyList";
import { listJourney, updateJourneyShow } from "../modules/journeys";
import { listPath, removePath } from "../modules/paths";

const JourneyListContainer = ({ location, match }) => {
  const [shows, setShows] = useState([false, false, false, false, false,false, false, false, false, false]); // show/hide checkbox

  const dispatch = useDispatch();
  const { journeys, loading, curPage, lastPage, error } = useSelector(
    ({ journeys, loading }) => ({
      journeys: journeys.journeys,
      error: journeys.error,
      loading: loading["journeys/LIST_JOURNEY"],
      curPage: journeys.curPage,
      lastPage: journeys.lastPage,
      //shows: journeys.shows,
    })
  );

  // request journey list, initialize show flag
  useEffect(() => {
    // var ar = [10];
    // for (var i = 0; i < 10; ++i) ar[i] = false;
    // dispatch(updateJourneyShow(ar));

    const { username } = match.params;
    const { page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listJourney({ username, page }));
  }, [dispatch, location.search, match.params]);

  // show/hide journey path
  const onShowPath = useCallback(
    (event, data) => {
      // update shows state
      var ar = Array.from(shows);
      ar[data.index] = !ar[data.index];
      setShows(ar);
      //dispatch(updateJourneyShow(ar));

      // request journey path if show
      const journey = journeys.find((item) => item.date === data.name);
      if (journey) {
        const timeid = journey.time_id;
        if (ar[data.index]) {
          dispatch(listPath({ timeid }));
        } else {
          console.log("hide " + timeid);
          dispatch(removePath({ timeid }));
        }
      }
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
