import Misc from '../services/misc';
import {Request, Response} from 'express';
import ResultHandler from '../const/respond';
import TestService from '../services/test';

class Tests {
    async getTopicList(req : Request, res : Response): Promise < void > {
        try {
            await Misc.logger(`Какой-то бесстрашный на ${
                req.socket.remoteAddress
            } запросил список тем. Ну и че по итогам:`, true);
            res.charset = "utf-8";
            let result = await TestService.fetchTopicList();
            await Misc.logger("Типа вернул: " + JSON.stringify(result), false);
            res.json(await ResultHandler.result<Array<{Key: number, Name: string, TName: string}>>('OK', result));
            await Misc.logger("Метод GET_TOPIC_LIST успешно прогнан!", false);
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await ResultHandler.result<{
                Code: number;
                Error: string;
                AdditionalInfo: object;
            }>('ERROR', await ResultHandler.buildError("GET_TOPIC_LIST", err)));
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
                    res.send(await ResultHandler.result<string>('OK', await Misc.logger("Метод SUBMIT_QUESTION успешно прогнан!", false)));
                }
            }
            await Misc.logger("Метод SUBMIT_QUESTION успешно прогнан!", false);
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await ResultHandler.result<{
                Code: number;
                Error: string;
                AdditionalInfo: object;
            }>('ERROR', await ResultHandler.buildError("SUBMIT_QUESTION", err)));
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
            res.json(await ResultHandler.result<Array<{Key: number, TName: string, Sh_Name: string}>>('OK', res1));
            await Misc.logger("Метод GET_DIFF_LIST успешно прогнан!", false);
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await ResultHandler.result<{
                Code: number;
                Error: string;
                AdditionalInfo: object;
            }>('ERROR', await ResultHandler.buildError("GET_DIFF_LIST", err)));
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
            res.send(await ResultHandler.result<string>('OK', await Misc.logger("Метод SUBMIT_TEST успешно прогнан!", false)));
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await ResultHandler.result<{
                Code: number;
                Error: string;
                AdditionalInfo: object;
            }>('ERROR', await ResultHandler.buildError("SUBMIT_TEST", err)));
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
                /*
鑓塵幗膂蓿f寥寢膃暠瘉甅甃槊槎f碣綮瘋聟碯颱亦尓㍍i:i:i;;:;:: : :
澣幗嶌塹傴嫩榛畝皋i袍耘蚌紕欒儼巓襴踟篁f罵f亦尓㍍i:i:i;;:;:: : :
漲蔭甃縟諛f麭窶膩I嶮薤篝爰曷樔黎㌢´　　｀ⅷ踟亦尓㍍i:i:i;;:;:: : :
蔕漓滿f蕓蟇踴f歙艇艀裲f睚鳫巓襴骸　　　　　贒憊亦尓㍍i:i:i;;:;:: : :
榊甃齊爰f懈橈燗殪幢緻I翰儂樔黎夢'”　 　 ,ｨ傾篩縒亦尓㍍i:i:i;;:;:: : :
箋聚蜚壊劑薯i暹盥皋袍i耘蚌紕偸′　　　 雫寬I爰曷f亦尓㍍i:i:i;;:;:: : :
銕颱麼寰篝螂徑悗f篝嚠篩i縒縡齢　　 　 　 Ⅷ辨f篝I鋗f亦尓㍍i:i:i;;:; : : .
碯聟f綴麼辨螢f璟輯駲f迯瓲i軌帶′　　　　　`守I厖孩f奎亦尓㍍i:i:i;;:;:: : : .
綮誣撒f曷磔瑩德f幢儂儼巓襴緲′　 　 　 　 　 `守枢i磬廛i亦尓㍍i:i:i;;:;:: : : .
慫寫廠徑悗緞f篝嚠篩I縒縡夢'´　　　 　 　 　 　 　 `守峽f徑悗f亦尓㍍i:i:i;;:;:: : : .
廛僵I數畝篥I熾龍蚌紕襴緲′　　　　　　　　　　　　　‘守畝皋弊i劍亦尓㍍i:i:i;;:;:: : : .
瘧i槲瑩f枢篝磬曷f瓲軌揄′　　　　　　　　　　　　　,gf毯綴徑悗嚠迩忙亦尓㍍i:i:i;;:;:: : :
襴罩硼f艇艀裲睚鳫襴鑿緲'　　　　　　　　　　 　 　 奪寔f厦傀揵猯i爾迩忙亦尓㍍i:i:i;;:;
椈棘斐犀耋絎絲絨緲′　　　　　　 　 　 　 　 　 　 　 ”'罨悳萪f蒂渹幇f廏迩忙i亦尓㍍
潁樗I瘧德幢i儂巓緲′　　　　　　 　 　 　 　 　 　 r㎡℡〟”'罨椁裂滅楔滄愼愰迩忙亦
翦i磅艘溲I搦儼巓登zzz zzz㎜㎜ｧg　 　 緲 g　 　 甯體i爺ゎ｡, ”'罨琥焜毳徭i嵬塰慍絲
枢篝磬f曷迯i瓲軌f襴暹 甯幗緲 ,fi'　　 緲',纜｡　　贒i綟碕碚爺ゎ｡ ”'罨皴發傲亂I黹靱
緞愾慊嵬嵯欒儼巓襴驫 霤I緲 ,緲　　 ＂,纜穐　　甯絛跨飩i髢馳爺ゎ｡`'等誄I筴碌I畷
罩硼I蒻筵硺艇艀i裲睚亀 篳'’,緲　　g亀 Ⅶil齢　　贒罩硼i艇艀裲睚鳫爺靠飭蛸I裘裔
椈f棘豢跫跪I衙絎絲絨i爺i㎜iⅣ 　 ,緲i亀 Ⅶ靈,　　甯傅喩I揵揚惹屡絎痙棏敞裔筴敢
頬i鞏褂f跫詹雋髢i曷迯瓲軌霤 　 ,緲蔭穐 Ⅶ穐 　 讎椈i棘貅f斐犀耋f絎絲觚f覃黹黍
襴蔽戮貲艀舅I肅肄肆槿f蝓Ⅷ 　 緲$慚I穐,疊穐　 甯萪碾f鋗輜靠f誹臧鋩f褂跫詹i雋
鋐篆f瘧蜑筴裔罩罧I緜孵蓼Ⅷ　 i鷆嫩槞i歉皸鱚　 冑縡諛諺彙溘嵳勠尠錣綴麼辨螢
                */
                let newQuestion = new QuestionEntity;
                newQuestion.TestKey = req.params.id;
                newQuestion.Header = i.Header;
                newQuestion.Answer = ans;
                test.push(newQuestion);
                if (test.length == res1.length) {
                    res.json(await ResultHandler.result<Array<{
                        TestKey: number,
                        Header: string,
                        Answer: Array<{
                            Key: number,
                            Text: string,
                            Img_Key: string | null,
                            Question_Key: number
                        }>
                    }>>('OK', test));
                }
            }
            await Misc.logger("Метод GET_TEST_BY_KEY успешно прогнан!", false);
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await ResultHandler.result<{
                Code: number;
                Error: string;
                AdditionalInfo: object;
            }>('ERROR', await ResultHandler.buildError("GET_TEST_BY_KEY", err)));
        }
    }
    async answerValidator(req : Request, res : Response): Promise < void > {
        try {
            res.json(await ResultHandler.result<{
                Correct: boolean;
            }>('OK', await TestService.validateAnswer(req.query.questionKey, req.query.answerKey)));
            await Misc.logger("Метод ANSWER_VALIDATE успешно прогнан!", false);
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await ResultHandler.result<{
                Code: number;
                Error: string;
                AdditionalInfo: object;
            }>('ERROR', await ResultHandler.buildError("ANSWER_VALIDATE", err)));
        }
    }
}

export default new Tests();
