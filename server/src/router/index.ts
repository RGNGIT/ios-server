import Tests from './test';
import Rules from './rule';
import Users from './user';

export async function buildRouter(app) {
    app.use('/api', Tests);
    app.use('/api', Rules);
    app.use('/api', Users);
}
