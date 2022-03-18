import {Request, Response} from 'express';
import FuzzyLogic from '../services/fuzzy';
import ResultHandler from '../const/err';
import Misc from '../services/misc';

class FuzzyAIController {
    async getJsonReport(req : Request, res : Response) {
        try {
            let termArray = [
                req.query.t1 as unknown as number,
                req.query.t2 as unknown as number,
                req.query.t3 as unknown as number,
                req.query.t4 as unknown as number,
                req.query.t5 as unknown as number,
                req.query.t6 as unknown as number
            ];
            res.json(await ResultHandler.result('OK', JSON.parse(await Misc.pyJsonFix(await FuzzyLogic.getFuzzyResult(termArray)))));
            await Misc.logger("Метод GET_FUZZY_RESULT успешно прогнан!", false);
        } catch (err) {
            await Misc.logger(err, false);
            res.json(ResultHandler.result('ERROR', await ResultHandler.buildError("GET_FUZZY_RESULT", err)));
        }
    }
}

export default new FuzzyAIController();
