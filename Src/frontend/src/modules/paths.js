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

export const listPath = createAction(LIST_PATH, ({ username, timeid }) => ({
  username,
  timeid,
}));

const listPathSaga = createRequestSaga(LIST_PATH, pathsAPI.listPath);
export function* pathsSaga() {
  yield takeLatest(LIST_PATH, listPathSaga);
}

const initialState = {
  paths: null,
  error: null,
};

const paths = handleActions(
  {
    [LIST_PATH_SUCCESS]: (state, { payload: paths, meta: response }) => ({
      ...state,
      paths,
    }),
    [LIST_PATH_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default paths;
