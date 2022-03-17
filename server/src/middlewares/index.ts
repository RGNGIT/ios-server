import { apiCheck } from './api-check'
import { authCheck } from './auth-check';
import ErrorHandler from '../const/err';
const methodOverride = require('method-override');

export function connectStaticMiddlewares(app) {
    app.use(methodOverride());
    app.use(apiCheck);
    !(process.env.DEV_MODE === 'true') ? app.use(authCheck) : null;
}
