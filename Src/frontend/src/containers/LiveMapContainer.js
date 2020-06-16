import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import LiveMap from "../components/LiveMap";
import { initLivePath, listLivePath } from "../modules/live";
import moment from "moment";

const LiveMapContainer = ({ fullscreen }) => {
  const dispatch = useDispatch();
  const { path, timeid, loading } = useSelector(({ live, paths, loading }) => ({
    path: live.path,
    timeid: live.timeid,
    error: live.error,
    loading: loading["live/LIST_LIVE_PATH"],
  }));

  // update live path
  const updateLivePath = useCallback(() => {
    //console.log("timer");
    //const time = moment().subtract(10, 'h').format("HH:mm:ss");
    const time = moment().format("HH:mm:ss");
    dispatch(listLivePath({time})); // request live path
  }, [dispatch]);

  // initialize
  useEffect(() => {
    dispatch(initLivePath()); // initiailize live redux
    dispatch(listLivePath({})); // request all journey path
    setInterval(updateLivePath, 5000);
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
