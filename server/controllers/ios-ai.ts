import { Request, Response } from "express";
import FuzzyLogic from "../services/fuzzy";
import ResultHandler from "../const/respond";
import Misc from "../services/misc";

class FuzzyAIController {
  async getStudentStatus(req: Request, res: Response): Promise<void> {
    try {
      const { physKey, disciplineKey } = req.query;
      
    } catch(err) {
      await Misc.logger(err, false);
      res.json(
        ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: object;
        }>("ERROR", await ResultHandler.buildError("GET_FUZZY_RESULT", err))
      );
    }
  }
  async getJsonReport(req: Request, res: Response): Promise<void> {
    try {
      let termArray = [
        Number(req.query.t1),
        Number(req.query.t2),
        Number(req.query.t3),
        Number(req.query.t4),
        Number(req.query.t5),
        Number(req.query.t6),
      ];
      res.json(
        await ResultHandler.result<{
          Result: number;
          Result_term: string;
          ResultFunc: object;
        }>(
          "OK",
          JSON.parse(
            await Misc.pyJsonFix(await FuzzyLogic.getFuzzyResult(termArray))
          )
        )
      );
      await Misc.logger("Метод GET_FUZZY_RESULT успешно прогнан!", false);
    } catch (err) {
      await Misc.logger(err, false);
      res.json(
        ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: object;
        }>("ERROR", await ResultHandler.buildError("GET_FUZZY_RESULT", err))
      );
    }
  }
}

export default new FuzzyAIController();
