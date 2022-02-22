const cors = require("cors");
const path = require("path");
import express from 'express';
import {buildRouter} from './router';
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

const static_path = path.join(__dirname, "../../../front");
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    app.use(express.static(static_path));
    res.sendFile(static_path + '/index.html');
});

(function () {
    app.listen(process.env.PORT, () => {
        console.log("Сервак им. Тагировой стартанул на порту: " + process.env.PORT);
    });
    buildRouter(app);
})();
