import ToSkip from "../const/skip-url";
import Error from "../const/response";
import { Request, Response } from "express";
import SERVER from "../const/request";
import PhysService from "../services/phys";

require("dotenv").config();

const roleDictionary = {
  student: [
    SERVER.GET_FUZZY_RESULT,
    SERVER.GET_FUZZY_STATUS,
    SERVER.GET_STORED_STATUS,
    SERVER.GET_STORED_STATUS_IOS
  ],
  expert: [
    
  ],
  operator: [

  ]
};

const roles = ['student', 'expert', 'operator'];

function checkAvailable(list: any[], subj: string): boolean {
  const regex = new RegExp(`/${process.env.API_CALL}|${list.map(x => '/' + x.split('/')[1]).join('|')}\/*/`);
  return Boolean(subj.match(regex));
}

export async function roleCheck(req: Request, res: Response, next): Promise<void> {
  if (!ToSkip.includes(req.originalUrl)) {
    const user = await PhysService.fetchOne(req.headers.userkey);
    if (checkAvailable(roleDictionary[roles[Number(user.phys.Role_Key) - 1]], req.originalUrl)) {
      next();
    } else {
      res.json(
        await Error.buildError(
          "ROLE",
          `Роль не подходит для данного запроса`
        )
      );
    }
  } else {
    next();
  }
}