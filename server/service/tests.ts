import Misc from './misc';
import MySQL2Commander from '../mysqlCommander';

class Tests {
    async getTopicList(req, res) {
        try {
            await Misc.logger(`Какой-то бесстрашный на ${
                req.socket.remoteAddress
            } запросил список тем. Ну и че по итогам:`, true);
            res.charset = "utf-8";
            req.charset = "utf-8";
            let result = await MySQL2Commander.queryExec("SELECT test.Key, test.Name, test_type.TName FROM test_type, test WHERE Test_Type_Key = test_type.Key;");
            await Misc.logger("Типа вернул: " + JSON.stringify(result), false);
            res.json(result);
        } catch (err) {
            await Misc.logger(err, false);
            res.send("Ошибочка");
        }
    }
    async submitQuestion(req, res) {
        try {
            let questions = 0;
            await Misc.logger(`Какой-то бесстрашный на ${
                req.socket.remoteAddress
            } добавил вопрос в базу (${
                JSON.stringify(req.body)
            }). Ну и че по итогам:`, true);
            res.charset = "utf-8";
            req.charset = "utf-8";
            let res1 = await MySQL2Commander.queryExec(`INSERT INTO test_question (Test_Key, Header) VALUES (${
                req.body.Testkey
            }, '${
                Misc.formatter(req.body.questionName)
            }');`);
            await Misc.logger(JSON.stringify(res1), false);
            let res2 = await MySQL2Commander.queryExec(`SELECT * FROM test_question ORDER BY 'Key';`);
            await Misc.logger(JSON.stringify(res2), false);
            for (let i of req.body.varArr) {
                let res3 = await MySQL2Commander.queryExec(`INSERT INTO ans_variant (Text, IsCorrect, Question_Key) VALUES ('${
                    await Misc.formatter(JSON.parse(i).varName)
                }', ${
                    JSON.parse(i).correct
                }, ${
                    res2[res2.length - 1].Key
                });`);
                await Misc.logger(JSON.stringify(res3), false);
                questions++;
                if (questions == (req.body.varArr.length - 1)) {
                    await Misc.logger("Метод SUBMIT_QUESTION успешно прогнан!", false);
                }
            }
        } catch (err) {
            await Misc.logger(err, false);
        }
    }
    async getDifficultyList(req, res) {
        try {
            await Misc.logger(`Какой-то бесстрашный на ${
                req.socket.remoteAddress
            } запросил список уровней сложности тестов. Ну и че по итогам:`, true);
            res.charset = "utf-8";
            req.charset = "utf-8";
            let res1 = await MySQL2Commander.queryExec("SELECT * FROM test_type;");
            await Misc.logger("Типа вернул: " + JSON.stringify(res1), false);
            res.json(res1);
            await Misc.logger("Метод GET_DIFF_LIST успешно прогнан!", false);
        } catch (err) {
            await Misc.logger(err, false);
        }
    }
    async submitTest(req, res) {
        try {
            await Misc.logger(`Какой-то бесстрашный на ${
                req.socket.remoteAddress
            } добавил тестик (${
                JSON.stringify(req.body)
            }). Ну и че по итогам:`, true);
            res.charset = "utf-8";
            req.charset = "utf-8";
            let res1 = await MySQL2Commander.queryExec(`INSERT INTO test (Test_Type_Key, Name) VALUES (${
                req.boby.difficulty
            }, '${
                await Misc.formatter(req.body.name)
            }');`);
            await Misc.logger(JSON.stringify(res1), false);
            await Misc.logger("Метод SUBMIT_TEST успешно прогнан!", false);
        } catch (err) {
            await Misc.logger(err, false);
        }
    }
}

export default new Tests();
