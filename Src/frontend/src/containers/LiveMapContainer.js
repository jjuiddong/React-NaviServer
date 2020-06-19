import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import LiveMap from "../components/LiveMap";
import { listLivePath, clearLivePath } from "../modules/live";
import { listTodayPath, addTodayPath } from "../modules/today";
import moment from "moment";

const LiveMapContainer = ({ fullscreen }) => {
  var _prevTime = "";
  var timerId = null;
  const dispatch = useDispatch();
  const { livePath, path, timeid, loading } = useSelector(
    ({ live, paths, loading, today }) => ({
      path: today.path,
      livePath: live.path,
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

    dispatch(listTodayPath({})); // request today path
    const timerId = setInterval(updateLivePath, 5000);
    return () => clearInterval(timerId);
  }, [dispatch, updateLivePath]);

  // too much live path, copy to path, and then remove live path
  useEffect(() => {
    if (path && path.getPath()) {
      console.log(path.getPath().length);
    }
    if (livePath && livePath.getPath()) {
      console.log(livePath.getPath().length);
    }

    if (livePath && livePath.getPath().length > 10) {
      var pathLine = livePath.getPath();
      dispatch(addTodayPath({pathLine}));
      dispatch(clearLivePath({}));
    }
  }, [path, livePath, dispatch]);

  return (
    <div>
      <LiveMap
        path={path}
        livePath={livePath}
        timeid={timeid}
        loading={loading}
        fullscreen={true}
      ></LiveMap>
    </div>
  );
};

export default LiveMapContainer;
