import {Request, Response} from 'express';
import FuzzyLogic from '../services/fuzzy';
import Error from '../const/err';
import Misc from '../services/misc';

class FuzzyAIController {
    async getJsonReport(req : Request, res : Response) {
        try {
            res.send(await FuzzyLogic.getFuzzyResult([81, 82, 83, 84, 85, 86]));
        } catch(err) {
            await Misc.logger(err, false);
            res.json(await Error.send("GET_FUZZY_RESULT", err));
        }
    }
}

export default new FuzzyAIController();