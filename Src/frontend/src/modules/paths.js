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

const INIT_PATH = "paths/INIT_PATH";
const REMOVE_PATH = "paths/REMOVE_PATH";

export const listPath = createAction(LIST_PATH, ({ username, timeid }) => ({
  username,
  timeid,
}));

export const initPath = createAction(INIT_PATH);
export const removePath = createAction(REMOVE_PATH, (timeid) => timeid);

const listPathSaga = createRequestSaga(LIST_PATH, pathsAPI.listPath);
export function* pathsSaga() {
  yield takeLatest(LIST_PATH, listPathSaga);
}

const initialState = {
  path: null,
  jpaths: [], // journey paths
  timeid: null,
  error: null,
};

const paths = handleActions(
  {
    [INIT_PATH]: (state) => {
      console.log("init path");
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
    [LIST_PATH_SUCCESS]: (state, { payload: path, meta: response }) => {
      const { kakao } = window;
      const timeid = response.headers["timeid"];
      const journey = state.jpaths.find((element) => element.timeid === timeid);
      var show = false;
      var polyline = null;
      if (journey) {
        // find journey path
        show = true;
      } else {
        var linePath = [];
        path.map((item) =>
          linePath.push(
            new kakao.maps.LatLng(parseFloat(item.lat), parseFloat(item.lon))
          )
        );

        polyline = new kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 5,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeStyle: "solid",
        });
      }

      return {
        ...state,
        jpaths: show
          ? state.jpaths
              .filter((element) => element.timeid !== timeid)
              .concat({ ...journey, show: true })
          : state.jpaths.concat({
              show: true,
              timeid: timeid,
              polyline: polyline,
            }),
      };
    },
    [LIST_PATH_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [REMOVE_PATH]: (state, { payload }) => {
      const timeid = payload.timeid;
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
      };
    },
  },
  initialState
);

export default paths;
