import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import * as pathsAPI from "../lib/api/paths";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";

const [
  LIST_LIVE_PATH,
  LIST_LIVE_PATH_SUCCESS,
  LIST_LIVE_PATH_FAILURE,
] = createRequestActionTypes("live/LIST_LIVE_PATH");

const CLEAR_LIVE_PATH = "live/CLEAR_LIVE_PATH";

export const clearLivePath = createAction(CLEAR_LIVE_PATH);

export const listLivePath = createAction(LIST_LIVE_PATH, ({ time }) => ({
  time,
}));

const listLivePathSaga = createRequestSaga(
  LIST_LIVE_PATH,
  pathsAPI.listTodayPath
);
export function* liveSaga() {
  yield takeLatest(LIST_LIVE_PATH, listLivePathSaga);
}

const initialState = {
  timeid: null,
  path: null,
  polyLine: null,
  error: null,
};

const live = handleActions(
  {
    [LIST_LIVE_PATH_SUCCESS]: (state, { payload: path, meta: response }) => {
      const { kakao } = window;
      //const timeid = response.headers["timeid"];

      var npath = [];
      var polyLine = null;
      if (path.length > 0) {
        var linePath = [];
        if (state.polyLine) {
          linePath = Array.from(state.polyLine.getPath());
          npath = Array.from(state.path);
          state.polyLine.setMap(null);
        }

        path.forEach((element) => {
          linePath.push(
            new kakao.maps.LatLng(
              parseFloat(element.lat),
              parseFloat(element.lon)
            )
          );
          npath.push(element);
        });

        polyLine = new kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 5,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeStyle: "solid",
        });

        var markers = [];
        var timeLines = [];
        var hour = 0;
        var prevTime = path.length > 0 ? new Date(path[0].date_time) : 0;
        for (var i = 0; i < path.length; ++i) {
          var delta =
            new Date(path[i].date_time).getTime() - prevTime.getTime();
          // 1 hour
          if (i === 0 || delta > Math.floor(60 * 60 * 1000)) {
            var markerPosition = new kakao.maps.LatLng(
              path[i].lat,
              path[i].lon
            );

            var marker = new kakao.maps.Marker({
              position: markerPosition,
            });
            markers.push(marker);

            var content =
              '<div class ="label"><span class="left"></span><span class="center">' +
              hour +
              "h. " +
              path[i].date_time +
              '</span><span class="right"></span></div>';
            var customOverlay = new kakao.maps.CustomOverlay({
              position: markerPosition,
              content: content,
            });
            timeLines.push(customOverlay);

            ++hour;
            prevTime = new Date(path[i].date_time);
          }
        } // ~for path
      }

      if (path.length > 0)
        return {
          ...state,
          path: npath,
          polyLine: polyLine,
          markers: markers,
          timeLines: timeLines,
        };
      return { ...state };
    },
    [LIST_LIVE_PATH_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CLEAR_LIVE_PATH]: (state, { payload }) => {
      if (state.polyLine) {
        state.polyLine.setMap(null);
      }
      return { ...state, polyLine: null, path: null };
    },
  },
  initialState
);

export default live;
