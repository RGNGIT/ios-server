import Misc from '../services/misc';
import MySQL2Commander from '../mysqlCommander';
import {json, Request, Response} from 'express';
import Error from '../const/err';
import RuleService from '../services/rule';

class Rules {
    async postRule(req : Request, res : Response): Promise < void > {
        try {
            await Misc.logger(`Какой-то бесстрашный на ${
                req.socket.remoteAddress
            } добавил правило (${
                JSON.stringify(req.body)
            }). Ну и че по итогам:`, true);
            let res1 = await RuleService.writeRule(
                await Misc.formatter(req.body.disciplineLevel), 
                await Misc.formatter(req.body.selfDevelopment), 
                await Misc.formatter(req.body.responsibility), 
                await Misc.formatter(req.body.perseverance), 
                await Misc.formatter(req.body.attentiveness), 
                await Misc.formatter(req.body.stress), 
                await Misc.formatter(req.body.result));
            await Misc.logger(JSON.stringify(res1), false);
            res.send(await Misc.logger("Метод POST_RULE успешно прогнан!", false));
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await Error.send("POST_RULE", err));
        }
    }
    async getRuleList(req : Request, res : Response): Promise < void > {
        try {
            await Misc.logger(`Какой-то бесстрашный на ${
                req.socket.remoteAddress
            } запросил список правил (${
                JSON.stringify(req.params)
            }). Ну и че по итогам:`, true);
            let res1 = await RuleService.fetchRules("Result");
            res.json(res1);
            await Misc.logger("Метод GET_RULE_LIST успешно прогнан!", false);
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await Error.send("GET_RULE_LIST", err));
        }
    }
    async updateRule(req : Request, res : Response): Promise < void > {
        try {
            await Misc.logger(`Какой-то бесстрашный на ${
                req.socket.remoteAddress
            } отредачил правило (${
                JSON.stringify(req.body)
            }). Ну и че по итогам:`, true);
            let res1 = await RuleService.updateRule(
                await Misc.formatter(req.body.Discipline_Level),
                await Misc.formatter(req.body.Self_Development),
                await Misc.formatter(req.body.Responsibility),
                await Misc.formatter(req.body.Perseverance),
                await Misc.formatter(req.body.Attentiveness),
                await Misc.formatter(req.body.Stress),
                await Misc.formatter(req.body.Result),
                req.params.id
            );
            await Misc.logger(JSON.stringify(res1), false);
            res.send(await Misc.logger("Метод UPDATE_RULE успешно прогнан!", false));
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await Error.send("UPDATE_RULE", err));
        }
    }
}

export default new Rules();
