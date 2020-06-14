import React, { useEffect } from "react";
import qs from "qs";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LandmarkList from "../components/LandmarkList";
import { listLandmark } from "../modules/landmarks";

const LandmarkListContainer = ({ location, match }) => {
  const dispatch = useDispatch();
  const { landmarks, loading, curPage, lastPage, error } = useSelector(
    ({ landmarks, loading }) => ({
      landmarks: landmarks.landmarks,
      error: landmarks.error,
      loading: loading["landmarks/LIST_LANDMARK"],
      curPage: landmarks.curPage,
      lastPage: landmarks.lastPage,
    })
  );

  useEffect(() => {
    const { username } = match.params;
    const { page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listLandmark({ username, page }));
  }, [dispatch, location.search, match.params]);

  return (
    <LandmarkList
      loading={loading}
      landmarks={landmarks}
      curPage={curPage}
      lastPage={lastPage}
      error={error}
    ></LandmarkList>
  );
};

export default withRouter(LandmarkListContainer);
