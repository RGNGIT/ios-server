import {apiCheck} from '../middlewares'
import ErrorHandler from '../const/err';
const methodOverride = require('method-override');

export * from './api-check';

export function connectMiddlewares(app) {
    app.use(methodOverride());
    app.use(apiCheck);
}
