import Router from 'koa-router';
import * as pathsCtrl from './paths.ctrl';

const paths = new Router();

paths.get('/', pathsCtrl.read);

export default paths;
