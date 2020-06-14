import Router from 'koa-router';
import * as landmarksCtrl from './landmarks.ctrl';

const landmarks = new Router();

landmarks.get('/', landmarksCtrl.list);

export default landmarks;
