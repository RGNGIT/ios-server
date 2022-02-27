import Misc from '../services/misc';
import MySQL2Commander from '../mysqlCommander';
import {Request, Response} from 'express';
import Error from '../const/err';

class Rules {
    async postRule(req : Request, res : Response): Promise < void > {
        try {
            await Misc.logger(`Какой-то бесстрашный на ${
                req.socket.remoteAddress
            } добавил правило (${
                JSON.stringify(req.body)
            }). Ну и че по итогам:`, true);
            let res1 = await MySQL2Commander.queryExec(`INSERT INTO rule (Discipline_Level, Self_Development, Responsibility, Perseverance, Attentiveness, Stress, Result) VALUES ('${
                await Misc.formatter(req.body.disciplineLevel)
            }', '${
                await Misc.formatter(req.body.selfDevelopment)
            }', '${
                await Misc.formatter(req.body.responsibility)
            }', '${
                await Misc.formatter(req.body.perseverance)
            }', '${
                await Misc.formatter(req.body.attentiveness)
            }', '${
                await Misc.formatter(req.body.stress)
            }', '${
                await Misc.formatter(req.body.result)
            }');`);
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
                JSON.stringify(req.query)
            }). Ну и че по итогам:`, true);
            if (req.query.sorted == "true") {
                let res1 = await MySQL2Commander.queryExec("SELECT * FROM rule;");
                await Misc.logger("Типа вернул: " + JSON.stringify(res1), false);
                res.json(res1);
            } else {
                let res2 = await MySQL2Commander.queryExec("SELECT * FROM rule ORDER BY Result;");
                await Misc.logger("Типа вернул: " + JSON.stringify(res2), false);
                res.json(res2);
            }
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
            let res1 = await MySQL2Commander.queryExec(`UPDATE rule SET Discipline_Level = '${
                await Misc.formatter(req.body.Discipline_Level)
            }', Self_Development = '${
                await Misc.formatter(req.body.Self_Development)
            }', Responsibility = '${
                await Misc.formatter(req.body.Responsibility)
            }', Perseverance = '${
                await Misc.formatter(req.body.Perseverance)
            }', Attentiveness = '${
                await Misc.formatter(req.body.Attentiveness)
            }', Stress = '${
                await Misc.formatter(req.body.Stress)
            }', Result = '${
                await Misc.formatter(req.body.Result)
            }' WHERE rule.Key = ${
                req.params.id
            };`);
            await Misc.logger(JSON.stringify(res1), false);
            res.send(await Misc.logger("Метод UPDATE_RULE успешно прогнан!", false));
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await Error.send("UPDATE_RULE", err));
        }
    }
}

export default new Rules();
