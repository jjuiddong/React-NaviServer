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
  path: null, // kakao.maps.Polyline
  error: null,
};

const today = handleActions(
  {
    [ADD_TODAY_PATH]: (state, { payload }) => {
      const { kakao } = window;

      const srcPath = payload.pathLine;
      var linePath = [];
      if (state.path) {
        linePath = Array.from(state.path.getPath());
        state.path.setMap(null);
      }
      srcPath.map((item) =>
        linePath.push(
          new kakao.maps.LatLng(item.Ha,item.Ga)
        )
      );

      var polyline = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeStyle: "solid",
      });

      return {
        ...state,
        path: polyline,
      };
    },
    [CLEAR_TODAY_PATH]: (state, { payload: error }) => {
      if (state.path) {
        state.path.setMap(null);
      }
      return { ...state, state: null };
    },
    [LIST_TODAY_PATH_SUCCESS]: (state, { payload: path, meta: response }) => {
      const { kakao } = window;

      if (state.path) {
        state.path.setMap(null);
      }

      var linePath = [];
      path.map((item) =>
        linePath.push(
          new kakao.maps.LatLng(parseFloat(item.lat), parseFloat(item.lon))
        )
      );
      var polyLine = new kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeStyle: "solid",
      });

      return {
        ...state,
        path: polyLine,
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
