import AuthService from '../services/auth';
import ToSkip from '../const/skip-url';
import Error from '../const/err';

export async function authCheck(req, res, next) {
    if (!ToSkip.includes(req.originalUrl)) {
        let User = {
            UserData: {
                UserKey: req.headers.userkey,
                Verify: req.headers.verify
            },
            Token: req.headers.token
        };
        if (await AuthService.verifyToken(User.Token, User)) {
            next();
        } else {
            res.json(await Error.send("AUTH_TOKEN", "Wrong auth token"));
        }
    } else {
        next();
    }
}
