import ToSkip from "../const/skip-url";
import Error from "../const/respond";
import Misc from "../services/misc";
import { Request, Response } from "express";
import chap from "chap";
import PhysService from "../services/phys";
import {sessions} from "../const/chap-storage";

export async function authCheck(
  req: Request,
  res: Response,
  next
): Promise<void> {
  if (!ToSkip.includes(req.originalUrl)) {
    const authHeader = req.headers.authorization;
    for (const user of sessions) {
      if (user.userkey == Number(req.headers.userkey)) {
        const userRes = await PhysService.fetchOne(req.headers.userkey);
        const chapCheck = userRes.reg.Password + user.N;
        console.log(chapCheck);
        console.log(authHeader);
        if (authHeader == chapCheck) {
          next();
          return;
        }
      }
    }
    res.json(
      await Error.buildError(
        "AUTH_TOKEN",
        `Чет ты мне дичь втираешь`
      )
    );
    await Misc.logger(
      `Ошибка ключа аутентификации. ${JSON.stringify(req.headers)}`,
      false
    );
  } else {
    next();
  }
}
