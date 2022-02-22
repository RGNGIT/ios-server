import Tests from './test';
import Rules from './rule';

export function buildRouter(app) {
    app.use('/api', Tests);
    app.use('/api', Rules);
}
