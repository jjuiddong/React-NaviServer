import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import * as pathsAPI from "../lib/api/paths";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";

const [
  LIST_PATH,
  LIST_PATH_SUCCESS,
  LIST_PATH_FAILURE,
] = createRequestActionTypes("paths/LIST_PATH");

const SHOW_PATH = "paths/SHOW_PATH";
const HIDE_PATH = "paths/HIDE_PATH";
const TOGGLE_SHOW_PATH = "paths/TOGGLE_SHOW_PATH";

export const listPath = createAction(
  LIST_PATH,
  ({ username, timeid, date }) => ({
    username,
    timeid,
    date,
  })
);

export const showPath = createAction(SHOW_PATH, (timeid) => timeid);
export const hidePath = createAction(HIDE_PATH, (timeid) => timeid);
export const toggleShowPath = createAction(
  TOGGLE_SHOW_PATH,
  (timeid) => timeid
);

const listPathSaga = createRequestSaga(LIST_PATH, pathsAPI.listPath);
export function* pathsSaga() {
  yield takeLatest(LIST_PATH, listPathSaga);
}

const initialState = {
  jpaths: [], // journey paths
  timeid: null,
  error: null,
  shows: new Map(), //timeid, Boolean(show/hide)
};

const paths = handleActions(
  {
    [LIST_PATH_SUCCESS]: (state, { payload: path, meta: response }) => {
      const { kakao } = window;
      const timeid = response.headers["timeid"];
      var linePath = [];
      path.map((item) =>
        linePath.push(
          new kakao.maps.LatLng(parseFloat(item.lat), parseFloat(item.lon))
        )
      );

      var polyline = new kakao.maps.Polyline({
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
        var delta = new Date(path[i].date_time).getTime() - prevTime.getTime();
        // 1 hour
        if (i === 0 || delta > Math.floor(60 * 60 * 1000)) {
          var markerPosition = new kakao.maps.LatLng(path[i].lat, path[i].lon);

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

      return {
        ...state,
        jpaths: state.jpaths
          .filter((element) => element.timeid !== timeid)
          .concat({
            show: true,
            timeid: timeid,
            polyline: polyline,
            markers: markers,
            timeLines: timeLines,
          }),
      };
    },
    [LIST_PATH_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [SHOW_PATH]: (state, { payload }) => {
      const timeid = payload.timeid;
      return {
        ...state,
        shows: new Map(state.shows).set(timeid, true),
      };
    },
    [HIDE_PATH]: (state, { payload }) => {
      const timeid = payload.timeid;
      return {
        ...state,
        shows: new Map(state.shows).set(timeid, false),
      };
    },
    [TOGGLE_SHOW_PATH]: (state, { payload }) => {
      const timeid = payload.timeid;
      var show = false;
      if (state.shows.has(timeid)) {
        show = !state.shows.get(timeid);
      } else {
        show = true;
      }

      const journey = state.jpaths.find((element) => element.timeid === timeid);

      return {
        ...state,
        jpaths: journey
          ? state.jpaths
              .filter((element) => element.timeid !== timeid)
              .concat({
                ...journey,
                show: false,
              })
          : state.jpaths,
        shows: new Map(state.shows).set(timeid, show),
      };
    },
  },
  initialState
);

export default paths;
