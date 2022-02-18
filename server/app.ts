const cors = require("cors");
const path = require("path");
import express from 'express';
import VueRouter from './service/vue';
import Tests from './service/tests';
import Rules from './service/rule';
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

const static_path = path.join(__dirname, "../../front");
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

app.get(SERVER.GET_TOPIC_LIST, async (req, res) => {
    await Tests.getTopicList(req, res);
});

app.post(SERVER.SUBMIT_QUESTION, async (req, res) => {
    await Tests.submitQuestion(req, res);
});

app.get(SERVER.GET_DIFF_LIST, async (req, res) => {
    await Tests.getDifficultyList(req, res);
});

app.post(SERVER.SUBMIT_TEST, async (req, res) => {
    await Tests.submitTest(req, res);
});
/*
app.post('/uploadImage', (req, res) => {
    console.log(req);
});
*/
app.post(SERVER.POST_RULE, async (req, res) => {
    await Rules.postRule(req, res);
});

app.get(SERVER.GET_RULE_LIST, async (req, res) => {
    await Rules.getRuleList(req, res);
});

app.patch(SERVER.UPDATE_RULE, async (req, res) => {
    await Rules.updateRule(req, res);
});
/*
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
*/
var listener = app.listen(process.env.PORT || 8080, () => {
    console.log("Сервак им. Тагировой стартанул на порту: " + listener.address());
});
