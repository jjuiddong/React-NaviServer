import Router from 'koa-router';
import * as pathsCtrl from './paths.ctrl';

const paths = new Router();

paths.get('/', pathsCtrl.read);
paths.get('/today', pathsCtrl.todayRead);

export default paths;
