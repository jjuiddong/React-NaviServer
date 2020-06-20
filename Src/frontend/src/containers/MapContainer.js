import React from "react";
import { useSelector } from "react-redux";
import Map from "../components/Map";

const MapContainer = ({ fullscreen }) => {
  const { timeid, jpaths, loading } = useSelector(
    ({ paths, loading }) => ({
      timeid: paths.timeid,
      jpaths: paths.jpaths,
      error: paths.error,
      loading: loading["paths/LIST_PATH"],
    })
  );

  return (
    <div>
      <Map
        timeid={timeid}
        jpaths={jpaths}
        loading={loading}
        fullscreen={fullscreen}
      ></Map>
    </div>
  );
};

export default MapContainer;
