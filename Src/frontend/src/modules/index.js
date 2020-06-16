import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import loading from "./loading";
import journeys, { journeysSaga } from "./journeys";
import landmarks, { landmarksSaga } from "./landmarks";
import paths, {pathsSaga} from './paths';
import live, {liveSaga} from './live';

const rootReducer = combineReducers({
  journeys,
  loading,
  landmarks,
  paths,
  live,
});

export function* rootSaga() {
  yield all([journeysSaga(), landmarksSaga(), pathsSaga(), liveSaga()]);
}

export default rootReducer;
