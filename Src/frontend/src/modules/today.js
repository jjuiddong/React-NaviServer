import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import * as pathsAPI from "../lib/api/paths";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";

const [
  LIST_TODAY_PATH,
  LIST_TODAY_PATH_SUCCESS,
  LIST_TODAY_PATH_FAILURE,
] = createRequestActionTypes("today/LIST_TODAY_PATH");

const ADD_TODAY_PATH = "today/ADD_TODAY_PATH";
const CLEAR_TODAY_PATH = "today/CLEAR_TODAY_PATH";

// path: kakao.maps.LatLng[]
export const addTodayPath = createAction(ADD_TODAY_PATH, (path) => path);
export const clearTodayPath = createAction(CLEAR_TODAY_PATH);
export const listTodayPath = createAction(LIST_TODAY_PATH);

const listTodayPathSaga = createRequestSaga(
  LIST_TODAY_PATH,
  pathsAPI.listTodayPath
);
export function* todaySaga() {
  yield takeLatest(LIST_TODAY_PATH, listTodayPathSaga);
}

const initialState = {
  path: null,
  polyLine: null, // kakao.maps.Polyline
  error: null,
};

const today = handleActions(
  {
    [ADD_TODAY_PATH]: (state, { payload }) => {
      const { kakao } = window;

      var linePath = [];
      var path = [];
      if (state.polyLine) {
        linePath = Array.from(state.polyLine.getPath());
        path = Array.from(state.path);
        state.polyLine.setMap(null);
      }
      
      const liveJourney = payload.liveJourney;
      liveJourney.path.forEach((element) => {
        linePath.push(
          new kakao.maps.LatLng(element.lat, element.lon)
        )
        path.push(element);
        return true;
      });

      var polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeStyle: "solid",
      });

      return {
        ...state,
        path: path,
        polyLine: polyline,
      };
    },
    [CLEAR_TODAY_PATH]: (state, { payload: error }) => {
      if (state.polyLine) {
        state.polyLine.setMap(null);
      }
      return { ...state
        , path: null
        , polyLine: null };
    },
    [LIST_TODAY_PATH_SUCCESS]: (state, { payload: path, meta: response }) => {
      const { kakao } = window;

      if (state.polyLine) {
        state.polyLine.setMap(null);
      }

      var linePath = path.map((item) =>
        new kakao.maps.LatLng(parseFloat(item.lat), parseFloat(item.lon)));

      var polyLine = new kakao.maps.Polyline({
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

      return {
        ...state,
        path: path,
        polyLine: polyLine,
        markers: markers,
        timeLines: timeLines,        
      };
    },
    [LIST_TODAY_PATH_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default today;
