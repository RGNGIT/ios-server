import {buildRouter} from './router';
import FL from './services/fuzzy';
import cors from 'cors';
import {apiCheck} from './middlewares';
import {authCheck} from './middlewares/auth-check';
import express from 'express';

const corsOpt = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};

const devMode: boolean = process.env.DEV_MODE === 'true';

class Server {
    async defaultMiddlewares(app) {
        app.use(express.json());
        app.use(cors(corsOpt));
        app.use(express.urlencoded({extended: true}));
        app.use(apiCheck);
        !devMode ? app.use(authCheck) : null;
    }
    async main(app) {
        await buildRouter(app); // Настроить руты
        await FL.jsonRuleBase(); // Считать базу правил
        await FL.jsonValidTerms(); // Актуальные термы
        // console.log(await FL.getFuzzyResult([99, 99, 99, 99, 99]));
    }
}

export default new Server();
