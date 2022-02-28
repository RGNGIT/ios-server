import {buildRouter} from './router';
import FL from './services/fuzzy';
import cors from 'cors';
import {apiCheck} from './middlewares';
import express from 'express';

const corsOpt = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};

class Server {
    async defaultMiddlewares(app) {
        app.use(express.json());
        app.use(cors(corsOpt));
        app.use(express.urlencoded({extended: true}));
        app.use(apiCheck);
    }
    async main(app) {
        await buildRouter(app); // Настроить руты
        await FL.jsonRuleBase(); // Считать базу правил
        await FL.jsonValidTerms(); // Актуальные термы
        // console.log(await FL.getFuzzyResult([1, 2, 3, 4, 5]));
    }
}

export default new Server();
