import AuthService from '../services/auth';
import ToSkip from '../const/skip-url';
import Error from '../const/err';
import Misc from '../services/misc';

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
            await Misc.logger(`Ошибка ключа аутентификации. ${JSON.stringify(req.headers)}`, false);
            res.json(await Error.send("AUTH_TOKEN", `Wrong auth token. DEV_MODE is ${process.env.DEV_MODE}`));
        }
    } else {
        next();
    }
}
