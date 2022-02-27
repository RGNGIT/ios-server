const cors = require("cors");
const path = require("path");
import express from 'express';
import {buildRouter} from './router';
import {apiCheck} from './middlewares';

const app = express();
require('dotenv').config();

const corsOpt = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};

const static_path = path.join(__dirname, "../../../front");
app.use(express.json());
app.use(cors(corsOpt));
app.use(express.urlencoded({extended: true}));
app.use(apiCheck);

(function () {
    app.listen(process.env.PORT, () => {
        console.log("Сервак им. Тагировой стартанул на порту: " + process.env.PORT);
    });
    buildRouter(app);
})();
