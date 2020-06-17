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

const INIT_LIVE_PATH = "live/INIT_LIVE_PATH";

export const listLivePath = createAction(
  LIST_LIVE_PATH,
  ({ time }) => ({
    time,
  })
);

export const initLivePath = createAction(INIT_LIVE_PATH);

const listLivePathSaga = createRequestSaga(
  LIST_LIVE_PATH,
  pathsAPI.listTodayPath
);
export function* liveSaga() {
  yield takeLatest(LIST_LIVE_PATH, listLivePathSaga);
}

const initialState = {
  path: null,
  timeid: null,
  error: null,
};

const live = handleActions(
  {
    [INIT_LIVE_PATH]: (state) => {
      const API_KEY = process.env.REACT_APP_API_KEY;
      const script = document.createElement("script");
      script.async = true;
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=" +
        API_KEY +
        "&autoload=false";
      document.head.appendChild(script);

      return { ...state };
    },
    [LIST_LIVE_PATH_SUCCESS]: (state, { payload: path, meta: response }) => {
      const { kakao } = window;
      //const timeid = response.headers["timeid"];

      var linePath = [];
      if (path && state.path) {
        linePath = Array.from(state.path.getPath());
      }
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
    [LIST_LIVE_PATH_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default live;
