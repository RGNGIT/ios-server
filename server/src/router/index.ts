import Tests from './test';
import Rules from './rule';
import Users from './user';
import Fuzzy from './ai';

export async function buildRouter(app) {
    app.use('/api', Tests);
    app.use('/api', Rules);
    app.use('/api', Users);
    app.use('/api', Fuzzy);
}
