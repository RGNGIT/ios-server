import Misc from './misc';
import MySQL2Commander from '../mysqlCommander';

class Tests {
    async getTopicList(req, res) {
        try {
            Misc.logger(`Какой-то бесстрашный на ${
                req.connection.remoteAddress
            } запросил список тем. Ну и че по итогам:`, true);
            res.charset = "utf-8";
            req.charset = "utf-8";
            let result = await MySQL2Commander.queryExec("SELECT test.Key, test.Name, test_type.TName FROM test_type, test WHERE Test_Type_Key = test_type.Key;");
            Misc.logger("Типа вернул: " + JSON.stringify(result), false);
            res.json(result);
        } catch (err) {
            Misc.logger(err, false);
            res.send("Ошибочка");
        }
    }
}

export default new Tests();
