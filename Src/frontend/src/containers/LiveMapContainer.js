import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import LiveMap from "../components/LiveMap";
import { initLivePath, listLivePath } from "../modules/live";
import moment from "moment";

const LiveMapContainer = ({ fullscreen }) => {
  var _prevTime = "";
  //const [_prevTime, setPrevTime] = useState("");
  const dispatch = useDispatch();
  const { path, timeid, loading } = useSelector(({ live, paths, loading }) => ({
    path: live.path,
    timeid: live.timeid,
    error: live.error,
    loading: loading["live/LIST_LIVE_PATH"],
  }));

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

    dispatch(initLivePath()); // initiailize live redux
    dispatch(listLivePath({})); // request all journey path
    setInterval(updateLivePath, 10000);
  }, [dispatch, updateLivePath]);

  return (
    <div>
      <LiveMap
        path={path}
        timeid={timeid}
        loading={loading}
        fullscreen={true}
      ></LiveMap>
      {/* <button onClick={onClick}>get path</button> */}
    </div>
  );
};

export default LiveMapContainer;
