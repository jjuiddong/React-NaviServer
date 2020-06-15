import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Map from "../components/Map";
import {initPath} from '../modules/paths';

const MapContainer = () => {
  const dispatch = useDispatch();
  const { path, timeid, jpaths, loading } = useSelector(({ paths, loading }) => ({
    path: paths.path,
    timeid: paths.timeid,
    jpaths: paths.jpaths,
    error: paths.error,
    loading: loading["paths/LIST_PATH"],
  }));

  useEffect(()=>{
    dispatch(initPath());
  },[dispatch]);

  return (    
    <div>
      <Map path={path} timeid={timeid} jpaths={jpaths} loading={loading}></Map>
    </div>
  );
};

export default MapContainer;
