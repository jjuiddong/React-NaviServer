import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Map from "../components/Map";
import { listPath } from "../modules/paths";

const MapContainer = () => {
  const dispatch = useDispatch();
  const { paths, loading } = useSelector(({ paths, loading }) => ({
    paths: paths.paths,
    error: paths.error,
    loading: loading["paths/LIST_PATH"],
  }));

  const onButtonClick = () => {
    const username = {};
    const timeid = "20200609092148505";
    dispatch(listPath({ username, timeid }));
  };

  return (
    <div>
      <Map paths={paths} loading={loading}></Map>
      <button onClick={onButtonClick}>request path</button>
    </div>
  );
};

export default MapContainer;
