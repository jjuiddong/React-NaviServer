import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import loading from "./loading";
import journeys, { journeysSaga } from "./journeys";
import landmarks, { landmarksSaga } from "./landmarks";
import paths, {pathsSaga} from './paths';

const rootReducer = combineReducers({
  journeys,
  loading,
  landmarks,
  paths,
});

export function* rootSaga() {
  yield all([journeysSaga(), landmarksSaga(), pathsSaga()]);
}

export default rootReducer;
