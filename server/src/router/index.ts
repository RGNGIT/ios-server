import Tests from './test';
import Rules from './rule';
import Users from './user';
import Fuzzy from './ai';

export async function buildRouter(router) {
    router.use(Tests);
    router.use(Rules);
    router.use(Users);
    router.use(Fuzzy);
}
