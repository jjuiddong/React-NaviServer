import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import loading from "./loading";
import journeys, { journeysSaga } from "./journeys";
import landmarks, { landmarksSaga } from "./landmarks";
import paths, {pathsSaga} from './paths';
import live, {liveSaga} from './live';
import today, {todaySaga} from './today';

const rootReducer = combineReducers({
  journeys,
  loading,
  landmarks,
  paths,
  live,
  today,
});

export function* rootSaga() {
  yield all([journeysSaga(), landmarksSaga(), pathsSaga(), liveSaga(), todaySaga()]);
}

export default rootReducer;
