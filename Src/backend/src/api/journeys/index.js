import Router from 'koa-router';
import * as journeysCtrl from './journeys.ctrl';

const journeys = new Router();

journeys.get('/', journeysCtrl.list);

export default journeys;
