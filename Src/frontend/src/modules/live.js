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
  map: null,
  path: null,
  timeid: null,
  error: null,
};

const live = handleActions(
  {
    [LIST_LIVE_PATH_SUCCESS]: (state, { payload: path, meta: response }) => {
      const { kakao } = window;
      //const timeid = response.headers["timeid"];

      var polyLine = null;
      if (path.length > 0) {
        var linePath = [];
        if (state.path) {
          linePath = Array.from(state.path.getPath());
          state.path.setMap(null);
        }

        path.map((item) =>
          linePath.push(
            new kakao.maps.LatLng(parseFloat(item.lat), parseFloat(item.lon))
          )
        );

        polyLine = new kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 5,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeStyle: "solid",
        });
      }

      if (path.length > 0) return { ...state, path: polyLine };
      return { ...state };
    },
    [LIST_LIVE_PATH_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [CLEAR_LIVE_PATH]: (state, { payload }) => {
      if (state.path) {
        state.path.setMap(null);
      }
      return { ...state, path: null };
    },
  },
  initialState
);

export default live;
