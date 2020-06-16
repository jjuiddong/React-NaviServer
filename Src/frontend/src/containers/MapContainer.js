import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Map from "../components/Map";
import { initPath} from "../modules/paths";
import moment from "moment";

const MapContainer = ({ fullscreen }) => {
  const dispatch = useDispatch();
  const { path, timeid, jpaths, loading } = useSelector(
    ({ paths, loading }) => ({
      path: paths.path,
      timeid: paths.timeid,
      jpaths: paths.jpaths,
      error: paths.error,
      loading: loading["paths/LIST_PATH"],
    })
  );

  useEffect(() => {
    dispatch(initPath());
  }, [dispatch]);

  // const onClick = () => {
  //   const timeid = "20200609092148505";
  //   const date = moment().format("YYYY-MM-DDTHH:mm:ss");
  //   dispatch(listPath({ timeid, date }));
  // };

  return (
    <div>
      <Map
        path={path}
        timeid={timeid}
        jpaths={jpaths}
        loading={loading}
        fullscreen={fullscreen}
      ></Map>
      {/* <button onClick={onClick}>get path</button> */}
    </div>
  );
};

export default MapContainer;
