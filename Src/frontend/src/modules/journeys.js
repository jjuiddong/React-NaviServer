import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import * as journeysAPI from "../lib/api/journeys";
import createRequestSaga, {
  createRequestActionTypes,
} from "../lib/createRequestSaga";

const [
  LIST_JOURNEY,
  LIST_JOURNEY_SUCCESS,
  LIST_JOURNEY_FAILURE,
] = createRequestActionTypes("journeys/LIST_JOURNEY");

export const listJourney = createAction(
  LIST_JOURNEY,
  ({ username, page }) => ({ username, page })
);

const listJourneySaga = createRequestSaga(
  LIST_JOURNEY,
  journeysAPI.listJourney
);
export function* journeysSaga() {
  yield takeLatest(LIST_JOURNEY, listJourneySaga);
}

const initialState = {
  journeys: null,
  error: null,
  curPage: 1,
  lastPage: 1,
};

const journeys = handleActions(
  {
    [LIST_JOURNEY_SUCCESS]: (state, { payload: journeys, meta: response }) => ({
      ...state,
      journeys,
      curPage: parseInt(response.headers["cur-page"], 10),
      lastPage: parseInt(response.headers["last-page"], 10),
    }),
    [LIST_JOURNEY_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState
);

export default journeys;
