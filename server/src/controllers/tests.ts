import Misc from '../services/misc';
import MySQL2Commander from '../mysqlCommander';
import {Request, Response} from 'express';
import Error from '../const/err';

class Tests {
    async getTopicList(req : Request, res : Response): Promise < void > {
        try {
            await Misc.logger(`Какой-то бесстрашный на ${
                req.socket.remoteAddress
            } запросил список тем. Ну и че по итогам:`, true);
            res.charset = "utf-8";
            let result = await MySQL2Commander.queryExec("SELECT test.Key, test.Name, test_type.TName FROM test_type, test WHERE Test_Type_Key = test_type.Key;");
            await Misc.logger("Типа вернул: " + JSON.stringify(result), false);
            res.json(result);
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await Error.send("GET_TOPIC_LIST", err));
        }
    }
    async submitQuestion(req : Request, res : Response): Promise < void > {
        try {
            let questions = 0;
            await Misc.logger(`Какой-то бесстрашный на ${
                req.socket.remoteAddress
            } добавил вопрос в базу (${
                JSON.stringify(req.body)
            }). Ну и че по итогам:`, true);
            res.charset = "utf-8";
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
                    res.send(await Misc.logger("Метод SUBMIT_QUESTION успешно прогнан!", false));
                }
            }
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await Error.send("SUBMIT_QUESTION", err));
        }
    }
    async getDifficultyList(req : Request, res : Response): Promise < void > {
        try {
            await Misc.logger(`Какой-то бесстрашный на ${
                req.socket.remoteAddress
            } запросил список уровней сложности тестов. Ну и че по итогам:`, true);
            res.charset = "utf-8";
            let res1 = await MySQL2Commander.queryExec("SELECT * FROM test_type;");
            await Misc.logger("Типа вернул: " + JSON.stringify(res1), false);
            res.json(res1);
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await Error.send("GET_DIFF_LIST", err));
        }
    }
    async submitTest(req : Request, res : Response): Promise < void > {
        try {
            await Misc.logger(`Какой-то бесстрашный на ${
                req.socket.remoteAddress
            } добавил тестик (${
                JSON.stringify(req.body)
            }). Ну и че по итогам:`, true);
            res.charset = "utf-8";
            let res1 = await MySQL2Commander.queryExec(`INSERT INTO test (Test_Type_Key, Name) VALUES (${
                req.body.difficulty
            }, '${
                await Misc.formatter(req.body.name)
            }');`);
            await Misc.logger(JSON.stringify(res1), false);
            res.send(await Misc.logger("Метод SUBMIT_TEST успешно прогнан!", false));
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await Error.send("SUBMIT_TEST", err));
        }
    }
    async getTest(req : Request, res : Response): Promise < void > {
        try {
            let test = [];
            class QuestionEntity {
                Header;
                Answer;
                Img;
                TestKey;
            };
            await Misc.logger(`Какой-то бесстрашный на ${
                req.socket.remoteAddress
            } запросил тест по ключу (${
                JSON.stringify(req.query)
            }). Ну и че по итогам:`, true);
            let res1 = await MySQL2Commander.queryExec(`SELECT * FROM test_question WHERE Test_Key = ${
                req.params.id
            };`);
            for (let i of res1) {
                let res2 = await MySQL2Commander.queryExec(`SELECT * FROM ans_variant WHERE Question_Key = ${
                    i.Key
                }`);
                let newQuestion = new QuestionEntity;
                newQuestion.TestKey = req.params.id;
                newQuestion.Header = i.Header;
                newQuestion.Answer = res2;
                test.push(newQuestion);
                if (test.length == res1.length) {
                    res.json(test);
                }
            }
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await Error.send("GET_TEST_BY_KEY", err));
        }
    }
}

export default new Tests();
