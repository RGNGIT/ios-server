import { Request, Response } from "express";

export function apiCheck(req: Request, res: Response, next): void {
  if (req.originalUrl.includes(process.env.API_CALL) || req.originalUrl.includes(process.env.CDN_CALL)) {
    next();
  } else {
    res.sendFile("index.html", { root: "../front/main-page" });
  }
}
