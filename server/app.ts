const express = require("express");
const oursql = require("mysql2");
const cors = require("cors");
const path = require("path");
import VueRouter from './service/vue';
import Tests from './service/tests';
import SERVER from './const/req';
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const morgan = require('morgan');

const app = express();

const corsOpt = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};

const static_path = path.join(__dirname, "./ios-site");
app.use(express.urlencoded({extended: true}));

// app.use(modrgan('combine'));
// app.use(bodyParser.json());
app.use(cors(corsOpt));

// Запросеки

app.get('/', (req, res) => {
    app.use(express.static(static_path));
    res.sendFile(static_path + '/index.html');
});

// Панелькины запросеки

app.get(SERVER.GET_VUE_PANEL, async (req, res) => {
    await VueRouter.vueRouterPanel(app, express, static_path, res);
});

// Main

app.get(SERVER.GET_VUE_PROFILE, async (req, res) => {
    await VueRouter.vueRouterMain(app, express, static_path, res);
});

app.get(SERVER.GET_VUE_COURSES, async (req, res) => {
    await VueRouter.vueRouterMain(app, express, static_path, res);
});

app.get(SERVER.GET_VUE_TEST, async (req, res) => {
    await VueRouter.vueRouterMain(app, express, static_path, res);
});

app.get(SERVER.GET_VUE_ADMINSETTINGS, async (req, res) => {
    await VueRouter.vueRouterMain(app, express, static_path, res);
});

app.get(SERVER.GET_VUE_MAMDANI, async (req, res) => {
    await VueRouter.vueRouterMain(app, express, static_path, res);
});

app.get(SERVER.GET_VUE_ABOUT, async (req, res) => {
    await VueRouter.vueRouterMain(app, express, static_path, res);
});

app.get('/getTopicList', async (req, res) => {
    await Tests.getTopicList(req, res);
});

app.get('/submitQuestion', (req, res) => {
    let questions = 0;
    logger(`Какой-то бесстрашный на ${
        req.connection.remoteAddress
    } добавил вопрос в базу (${
        JSON.stringify(req.query)
    }). Ну и че по итогам:`, true);
    res.charset = "utf-8";
    req.charset = "utf-8";
    stablishedConnection().then((connection) => {
        connection.query(`INSERT INTO test_question (Test_Key, Header) VALUES (${
            req.query.Testkey
        }, '${
            formatter(req.query.questionName)
        }');`, (err1, res1, fields1) => {
            if (err1) {
                logger(err1, false);
                res.send("Ошибочка");
            } else 
                logger(JSON.stringify(res1), false);
            

            connection.query(`SELECT * FROM test_question ORDER BY 'Key';`, (err2, res2, fields2) => {
                if (err2) {
                    logger(err2, false);
                    res.send("Ошибочка");
                } else 
                    logger(JSON.stringify(res2), false);
                

                for (var i of req.query.varArr) {
                    console.log(JSON.stringify(i));
                    connection.query(`INSERT INTO ans_variant (Text, IsCorrect, Question_Key) VALUES ('${
                        formatter(JSON.parse(i).varName)
                    }', ${
                        JSON.parse(i).correct
                    }, ${
                        res2[res2.length - 1].Key
                    });`, (err3, res3, fields3) => {
                        if (err3) {
                            logger(err3, false);
                            res.send("Ошибочка");
                        } else 
                            logger(JSON.stringify(res3), false);
                         questions++;
                        if (questions == (req.query.varArr.length - 1)) {
                            logger(closeDbConnection(connection, "SUBMIT_QUESTION"), false);
                        }
                    });
                }
            });
        });
    });
});

app.get("/getDiffList", (req, res) => {
    logger(`Какой-то бесстрашный на ${
        req.connection.remoteAddress
    } запросил список уровней сложности тестов. Ну и че по итогам:`, true);
    res.charset = "utf-8";
    req.charset = "utf-8";
    stablishedConnection().then((connection) => {
        connection.query("SELECT * FROM test_type;", (err, results, fields) => {
            if (err) {
                logger(err, false);
                res.send("Ошибочка");
            } else {
                logger("Типа вернул: " + JSON.stringify(results), false);
                res.json(results);
            }
        });
        logger(closeDbConnection(connection, "GET_DIFF_LIST"), false);
    });
});

app.get("/submitTest", (req, res) => {
    logger(`Какой-то бесстрашный на ${
        req.connection.remoteAddress
    } добавил тестик (${
        JSON.stringify(req.query)
    }). Ну и че по итогам:`, true);
    res.charset = "utf-8";
    req.charset = "utf-8";
    stablishedConnection().then((connection) => {
        connection.query(`INSERT INTO test (Test_Type_Key, Name) VALUES (${
            req.query.difficulty
        }, '${
            formatter(req.query.name)
        }');`, (err, results, fields) => {
            if (err) {
                logger(err, false);
                res.send("Ошибочка");
            } else 
                logger(JSON.stringify(results), false);
            

        });
        closeDbConnection(connection, "SUBMIT_TEST");
    });
});

app.post('/uploadImage', (req, res) => {
    console.log(req);
});

app.get('/postRule', (req, res) => {
    logger(`Какой-то бесстрашный на ${
        req.connection.remoteAddress
    } добавил правило (${
        JSON.stringify(req.query)
    }). Ну и че по итогам:`, true);
    stablishedConnection().then(connection => {
        connection.query(`INSERT INTO rule (Discipline_Level, Self_Development, Responsibility, Perseverance, Attentiveness, Stress, Result) VALUES ('${
            formatter(req.query.disciplineLevel)
        }', '${
            formatter(req.query.selfDevelopment)
        }', '${
            formatter(req.query.responsibility)
        }', '${
            formatter(req.query.perseverance)
        }', '${
            formatter(req.query.attentiveness)
        }', '${
            formatter(req.query.stress)
        }', '${
            formatter(req.query.result)
        }');`, (err, results, fields) => {
            if (err) {
                logger(err, false);
                res.send("Ошибочка");
            } else 
                logger(JSON.stringify(results), false);
            

        });
        closeDbConnection(connection, "POST_RULE");
    });
});

app.get('/getRuleList', (req, res) => {
    logger(`Какой-то бесстрашный на ${
        req.connection.remoteAddress
    } запросил список правил (${
        JSON.stringify(req.query)
    }). Ну и че по итогам:`, true);
    if (req.query.sorted == "true") {
        stablishedConnection().then((connection) => {
            connection.query("SELECT * FROM rule;", (err, results, fields) => {
                if (err) {
                    logger(err, false);
                    res.send("Ошибочка");
                } else {
                    logger("Типа вернул: " + JSON.stringify(results), false);
                    res.json(results);
                }
            });
            closeDbConnection(connection, "GET_RULE_LIST");
        });
    } else {
        stablishedConnection().then((connection) => {
            connection.query("SELECT * FROM rule ORDER BY Result;", (err, results, fields) => {
                if (err) {
                    logger(err, false);
                    res.send("Ошибочка");
                } else {
                    logger("Типа вернул: " + JSON.stringify(results), false);
                    res.json(results);
                }
            });
            closeDbConnection(connection, "GET_RULE_LIST");
        });
    }
});

app.get('/updateRule', (req, res) => {
    logger(`Какой-то бесстрашный на ${
        req.connection.remoteAddress
    } отредачил правило (${
        JSON.stringify(req.query)
    }). Ну и че по итогам:`, true);
    stablishedConnection().then(connection => {
        connection.query(`UPDATE rule SET Discipline_Level = '${
            formatter(req.query.Discipline_Level)
        }', Self_Development = '${
            formatter(req.query.Self_Development)
        }', Responsibility = '${
            formatter(req.query.Responsibility)
        }', Perseverance = '${
            formatter(req.query.Perseverance)
        }', Attentiveness = '${
            formatter(req.query.Attentiveness)
        }', Stress = '${
            formatter(req.query.Stress)
        }', Result = '${
            formatter(req.query.Result)
        }' WHERE rule.Key = ${
            req.query.Key
        };`, (err, results, fields) => {
            if (err) {
                logger(err, false);
                res.send("Ошибочка");
            } else 
                logger(JSON.stringify(results), false);
            

        });
        closeDbConnection(connection, "UPDATE_RULE");
    });
});

app.get('/getTest', (req, res) => {
    logger(`Какой-то бесстрашный на ${
        req.connection.remoteAddress
    } запросил тест по ключу (${
        JSON.stringify(req.query)
    }). Ну и че по итогам:`, true);
    stablishedConnection().then(connection => {
        connection.query(`SELECT * FROM test_question WHERE Test_Key = ${
            req.query.testKey
        };`, (err1, results1, fields1) => {
            if (err1) {
                logger(err1, false);
                res.send("Ошибочка");
            } else {
                let test = [];
                class question {
                    Header;
                    Answer;
                    Img;
                    TestKey;
                };
                for (let i of results1) {
                    connection.query(`SELECT * FROM ans_variant WHERE Question_Key = ${
                        i.Key
                    }`, (err2, results2, fields2) => {
                        if (err2) {
                            logger(err2, false);
                            res.send("Ошибочка");
                        } else {
                            let newQuestion = new question;
                            newQuestion.TestKey = req.query.testKey;
                            newQuestion.Header = i.Header;
                            newQuestion.Answer = results2;
                            test.push(newQuestion);
                        }
                        if (test.length == results1.length) {
                            res.json(test);
                            closeDbConnection(connection, "GET_TEST_BY_KEY");
                        }
                    });
                }
            }
        });

    });
});

var listener = app.listen(process.env.PORT || 8080, () => {
    console.log("Сервак им. Тагировой стартанул на порту: " + listener.address().port);
});
