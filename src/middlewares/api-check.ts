import { Request, Response } from "express";

export let skipUrl = [process.env.API_CALL]

export function apiCheck(req: Request, res: Response, next): void {
  const checkExists = (): boolean => {
    for(const url of skipUrl) {
      if(req.originalUrl.includes(url)) {
        return true;
      }
    }
    return false;
  }
  if (checkExists()) {
    next();
  } else {
    res.send(`Ну куда ты? Тут только доступ к апи через ${skipUrl.join(" или ")}`);
  }
}
