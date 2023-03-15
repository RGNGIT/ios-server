import ToSkip from "../const/skip-url";
import Error from "../const/respond";
import { Request, Response } from "express";
import SERVER from "../const/req";

require("dotenv").config();

const roleDictionary = {
  student: [
    SERVER.GET_FUZZY_RESULT, 
    SERVER.GET_TEST_BY_KEY,
    SERVER.ANSWER_VALIDATE
  ],
  expert: [
    SERVER.SUBMIT_TEST,
    SERVER.SUBMIT_QUESTION, 
    SERVER.GET_DIFF_LIST,
    SERVER.GET_TOPIC_LIST, 
    SERVER.POST_RULE,
    SERVER.GET_RULE_LIST,
    SERVER.UPDATE_RULE
  ]
};

const roles = ['student', 'expert'];

function checkAvailable(list, subj): boolean {
  for(const item of list) {
    if((process.env.API_CALL + item).includes(subj)) return true;
  }
  return false;
}

export async function roleCheck(req: Request, res: Response, next): Promise<void> {
  if (!ToSkip.includes(req.originalUrl)) {
    const roleKey = Number(req.headers.rolekey) - 1;
    if(checkAvailable(roleDictionary[roles[roleKey]], req.originalUrl)) {
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