import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import * as landmarksAPI from "../lib/api/landmarks";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";

const [
  LIST_LANDMARK,
  LIST_LANDMARK_SUCCESS,
  LIST_LANDMARK_FAILURE,
] = createRequestActionTypes("landmarks/LIST_LANDMARK");

export const listLandmark = createAction(
  LIST_LANDMARK,
  ({ username, page }) => ({ username, page })
);

const listLandmarkSaga = createRequestSaga(
  LIST_LANDMARK,
  landmarksAPI.listLandmark
);
export function* landmarksSaga() {
  yield takeLatest(LIST_LANDMARK, listLandmarkSaga);
}

const initialState = {
  landmarks: null,
  error: null,
  curPage: 1,
  lastPage: 1,
};

const landmarks = handleActions(
  {
    [LIST_LANDMARK_SUCCESS]: (state, { payload: landmarks, meta: response }) => ({
      ...state,
      landmarks,
      curPage: parseInt(response.headers["cur-page"], 10),
      lastPage: parseInt(response.headers["last-page"], 10),
    }),
    [LIST_LANDMARK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default landmarks;
