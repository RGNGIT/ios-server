import Misc from '../services/misc';
import {Request, Response} from 'express';
import Error from '../const/err';
import TestService from '../services/test';

class Tests {
    async getTopicList(req : Request, res : Response): Promise < void > {
        try {
            await Misc.logger(`Какой-то бесстрашный на ${
                req.socket.remoteAddress
            } запросил список тем. Ну и че по итогам:`, true);
            res.charset = "utf-8";
            let result = TestService.fetchTopicList();
            await Misc.logger("Типа вернул: " + JSON.stringify(result), false);
            res.json(await Error.result('OK', result));
            await Misc.logger("Метод GET_TOPIC_LIST успешно прогнан!", false);
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await Error.result('ERROR', await Error.buildError("GET_TOPIC_LIST", err)));
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
            let res1 = await TestService.writeQuestion(req.body.Testkey, await Misc.formatter(req.body.questionName));
            await Misc.logger(JSON.stringify(res1), false);
            let res2 = await TestService.fetchQuestions('Key');
            await Misc.logger(JSON.stringify(res2), false);
            for (let i of req.body.varArr) {
                let res3 = await TestService.writeAnswers(await Misc.formatter(JSON.parse(i).varName), JSON.parse(i).correct, res2[res2.length - 1].Key);
                await Misc.logger(JSON.stringify(res3), false);
                questions++;
                if (questions == (req.body.varArr.length - 1)) {
                    res.send(await Error.result('OK', await Misc.logger("Метод SUBMIT_QUESTION успешно прогнан!", false)));
                }
            }
            await Misc.logger("Метод SUBMIT_QUESTION успешно прогнан!", false);
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await Error.result('ERROR', await Error.buildError("SUBMIT_QUESTION", err)));
        }
    }
    async getDifficultyList(req : Request, res : Response): Promise < void > {
        try {
            await Misc.logger(`Какой-то бесстрашный на ${
                req.socket.remoteAddress
            } запросил список уровней сложности тестов. Ну и че по итогам:`, true);
            res.charset = "utf-8";
            let res1 = await TestService.fetchDifficultyList();
            await Misc.logger("Типа вернул: " + JSON.stringify(res1), false);
            res.json(await Error.result('OK', res1));
            await Misc.logger("Метод GET_DIFF_LIST успешно прогнан!", false);
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await Error.result('ERROR', await Error.buildError("GET_DIFF_LIST", err)));
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
            let res1 = await TestService.submitTest(req.body.difficulty, await Misc.formatter(req.body.name));
            await Misc.logger(JSON.stringify(res1), false);
            res.send(await Error.result('OK', await Misc.logger("Метод SUBMIT_TEST успешно прогнан!", false)));
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await Error.result('ERROR', await Error.buildError("SUBMIT_TEST", err)));
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
            let res1 = await TestService.fetchQuestionsByKey(req.params.id);
            for (let i of res1) {
                let res2 = await TestService.fetchAnswerVariantsByKey(i.Key);
                let ans = [];
                for (let answer of res2) {
                    ans.push({Key: answer.Key, Text: answer.Text, Img_Key: answer.Img_Key, Question_Key: answer.Question_Key});
                }
                let newQuestion = new QuestionEntity;
                newQuestion.TestKey = req.params.id;
                newQuestion.Header = i.Header;
                newQuestion.Answer = ans;
                test.push(newQuestion);
                if (test.length == res1.length) {
                    res.json(await Error.result('OK', test));
                }
            }
            await Misc.logger("Метод GET_TEST_BY_KEY успешно прогнан!", false);
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await Error.result('ERROR', await Error.buildError("GET_TEST_BY_KEY", err)));
        }
    }
    async answerValidator(req : Request, res : Response): Promise < void > {
        try {
            res.json(await Error.result('OK', await TestService.validateAnswer(req.query.questionKey, req.query.answerKey)));
            await Misc.logger("Метод ANSWER_VALIDATE успешно прогнан!", false);
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await Error.result('ERROR', await Error.buildError("ANSWER_VALIDATE", err)));
        }
    }
}

export default new Tests();
