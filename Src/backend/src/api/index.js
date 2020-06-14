import Router from 'koa-router';
import journeys from './journeys';
import landmarks from './landmarks';
import paths from './paths';

const api = new Router();

api.use('/journeys', journeys.routes());
api.use('/landmarks', landmarks.routes());
api.use('/paths', paths.routes());

export default api;
