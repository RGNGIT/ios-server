import Tests from './test';
import Rules from './rule';

export async function buildRouter(app) {
    app.use('/api', Tests);
    app.use('/api', Rules);
}
