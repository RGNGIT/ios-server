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
require('dotenv').config();

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

app.get(SERVER.GET_VUE_PANEL, async (req, res) : Promise < void > => await VueRouter.vueRouterPanel(app, express, static_path, res));

// Main

app.get(SERVER.GET_VUE_PROFILE, async (req, res) : Promise < void > => await VueRouter.vueRouterMain(app, express, static_path, res));

app.get(SERVER.GET_VUE_COURSES, async (req, res) : Promise < void > => await VueRouter.vueRouterMain(app, express, static_path, res));

app.get(SERVER.GET_VUE_TEST, async (req, res) : Promise < void > => await VueRouter.vueRouterMain(app, express, static_path, res));

app.get(SERVER.GET_VUE_ADMINSETTINGS, async (req, res) : Promise < void > => await VueRouter.vueRouterMain(app, express, static_path, res));

app.get(SERVER.GET_VUE_MAMDANI, async (req, res) : Promise < void > => await VueRouter.vueRouterMain(app, express, static_path, res));

app.get(SERVER.GET_VUE_ABOUT, async (req, res) : Promise < void > => await VueRouter.vueRouterMain(app, express, static_path, res));

app.get(SERVER.GET_TOPIC_LIST, async (req, res) : Promise < void > => await Tests.getTopicList(req, res));

app.post(SERVER.SUBMIT_QUESTION, async (req, res) : Promise < void > => await Tests.submitQuestion(req, res));

app.get(SERVER.GET_DIFF_LIST, async (req, res) : Promise < void > => await Tests.getDifficultyList(req, res));

app.post(SERVER.SUBMIT_TEST, async (req, res) : Promise < void > => await Tests.submitTest(req, res));
/*
app.post('/uploadImage', (req, res) => {
    console.log(req);
});
*/
app.post(SERVER.POST_RULE, async (req, res) : Promise < void > => await Rules.postRule(req, res));

app.get(SERVER.GET_RULE_LIST, async (req, res) : Promise < void > => await Rules.getRuleList(req, res));

app.patch(SERVER.UPDATE_RULE, async (req, res) : Promise < void > => await Rules.updateRule(req, res));

app.get(SERVER.GET_TEST_BY_KEY, async (req, res) : Promise < void > => await Tests.getTest(req, res));

(function () {
    app.listen(process.env.PORT, () => {
        console.log("Сервак им. Тагировой стартанул на порту: " + process.env.PORT);
    });
})();
