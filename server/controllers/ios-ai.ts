import { Request, Response } from "express";
import FuzzyLogic from "../services/fuzzy";
import TestService from "../services/test";
import ResultHandler from "../const/respond";
import Misc from "../services/misc";
import PhysService from "../services/phys";

enum Terms {
  PERSEVERANCE = 21,
  SELF_DEVELOPMENT = 22,
  ATTENTIVENESS = 23,
  RESPONSIBILITY = 24,
  STRESS = 25,
  DISCIPLINE = 26
}

function fetchTermResult(testResults, termId) {
  for (const result of testResults) {
    if (result.testType.Key == termId) {
      return result;
    }
  }
  return null;
}

function definePercentageOfTest(result) {
  const splitResult = result.split('/');
  return Math.round((Number(splitResult[0]) / Number(splitResult[1])) * 100);
}

class FuzzyAIController {
  async getStoredStatus(req: Request, res: Response): Promise<void> {
    try {
      const { physId, disciplineId } = req.query;
      const result = await FuzzyLogic.fetchStoredStatus(physId, disciplineId);
      res.json(
        await ResultHandler.result<Array<{}>>(
          "OK",
          result
        )
      );
    } catch(err) {
      await Misc.logger(err, false);
      res.json(
        ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: object;
        }>("ERROR", await ResultHandler.buildError("GET_STORED_STATUS", err))
      );
    }
  }
  async getStudentStatus(req: Request, res: Response): Promise<void> {
    try {
      const { physKey, disciplineKey } = req.query;
      const testResults = await TestService.fetchTestResults(physKey, disciplineKey);
      for await (const result of testResults) {
        const testMeta = (await TestService.fetchTestMetaByKey(result.Test_Key))[0];
        result.testType = await TestService.fetchTestTypeByKey(testMeta.Test_Type_Key);
      }
      const rawTermArray = [
        fetchTermResult(testResults, Terms.DISCIPLINE),
        fetchTermResult(testResults, Terms.SELF_DEVELOPMENT),
        fetchTermResult(testResults, Terms.RESPONSIBILITY),
        fetchTermResult(testResults, Terms.PERSEVERANCE),
        fetchTermResult(testResults, Terms.ATTENTIVENESS),
        fetchTermResult(testResults, Terms.STRESS)
      ];
      let termArray = [];
      for (const rawTerm of rawTermArray) {
        termArray.push(definePercentageOfTest(rawTerm.Result));
      }
      const result = JSON.parse(
        await Misc.pyJsonFix(await FuzzyLogic.getFuzzyResult(termArray))
      );
      await PhysService.writeStatus({
        Perseverance: termArray[3],
        Self_Development: termArray[1],
        Attentiveness: termArray[4],
        Responsibility: termArray[2],
        Stress: termArray[5],
        Discipline: termArray[0],
        Result: result.Result,
        Status: `'${result.Result_term}'`,
        Phys_Key: physKey,
        Discip_Key: disciplineKey
      });
      res.json(
        await ResultHandler.result<{
          Result: number;
          Result_term: string;
          ResultFunc: object;
        }>(
          "OK",
          result
        )
      );
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
