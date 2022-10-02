import { Request, Response } from "express";
import FuzzyLogic from "../services/fuzzy";
import ResultHandler from "../const/respond";
import Misc from "../services/misc";

class FuzzyAIController {
  async getJsonReport(req: Request, res: Response): Promise<void> {
    try {
      let termArray = [
        (<unknown>req.query.t1) as number,
        (<unknown>req.query.t2) as number,
        (<unknown>req.query.t3) as number,
        (<unknown>req.query.t4) as number,
        (<unknown>req.query.t5) as number,
        (<unknown>req.query.t6) as number,
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
