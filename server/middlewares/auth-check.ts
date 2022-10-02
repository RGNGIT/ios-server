import AuthService from "../services/auth";
import ToSkip from "../const/skip-url";
import Error from "../const/respond";
import Misc from "../services/misc";
import { Request, Response } from "express";

export async function authCheck(
  req: Request,
  res: Response,
  next
): Promise<void> {
  if (!ToSkip.includes(req.originalUrl)) {
    let User = {
      UserData: {
        UserKey: req.headers.userkey,
        Verify: req.headers.verify,
      },
      Token: req.headers.token,
    };
    if (await AuthService.verifyToken(<string>User.Token, User)) {
      next();
    } else {
      await Misc.logger(
        `Ошибка ключа аутентификации. ${JSON.stringify(req.headers)}`,
        false
      );
      res.json(
        await Error.buildError(
          "AUTH_TOKEN",
          `Wrong auth token. DEV_MODE is ${process.env.DEV_MODE}`
        )
      );
    }
  } else {
    next();
  }
}
