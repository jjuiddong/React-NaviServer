import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import LiveMap from "../components/LiveMap";
import { listLivePath, clearLivePath } from "../modules/live";
import { listTodayPath, addTodayPath } from "../modules/today";
import moment from "moment";

const LiveMapContainer = ({ fullscreen }) => {
  var _prevTime = "";
  const dispatch = useDispatch();
  const { liveJourney, todayJourney, timeid, loading } = useSelector(
    ({ live, loading, today }) => ({
      todayJourney: today,
      liveJourney: live,
      timeid: live.timeid,
      error: live.error,
      loading: loading["live/LIST_LIVE_PATH"],
    })
  );

  // update live path
  const updateLivePath = useCallback(() => {
    //const time = moment().subtract(10, 'h').format("HH:mm:ss");
    const time = _prevTime; //moment().format("HH:mm:ss");
    _prevTime = moment().format("HH:mm:ss");
    dispatch(listLivePath({ time })); // request live path
  }, [dispatch]);

  // initialize
  useEffect(() => {
    _prevTime = moment().format("HH:mm:ss");

    dispatch(clearLivePath({}));
    dispatch(listTodayPath({})); // request today path
    const timerId = setInterval(updateLivePath, 5000);
    return () => clearInterval(timerId);
  }, [dispatch, updateLivePath]);

  // too much live path, copy to today path, and then remove live path
  useEffect(() => {
    // if (todayJourney.polyLine && todayJourney.polyLine.getPath()) {
    //   console.log(todayJourney.polyLine.getPath().length);
    // }
    // if (liveJourney.polyLine && liveJourney.polyLine.getPath()) {
    //   console.log(liveJourney.polyLine.getPath().length);
    // }

    if (liveJourney.polyLine && liveJourney.polyLine.getPath().length > 100) {
      dispatch(addTodayPath({liveJourney}));
      dispatch(clearLivePath({}));
    }
  }, [liveJourney, todayJourney, dispatch]);

  return (
    <div>
      <LiveMap
        todayJourney={todayJourney}
        liveJourney={liveJourney}
        timeid={timeid}
        loading={loading}
        fullscreen={true}
      ></LiveMap>
    </div>
  );
};

export default LiveMapContainer;
