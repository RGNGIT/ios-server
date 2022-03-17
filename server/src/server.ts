import {buildRouter} from './router';
import FL from './services/fuzzy';
import cors from 'cors';
import {apiCheck} from './middlewares';
import {authCheck} from './middlewares/auth-check';
import express from 'express';
import monitor from 'express-status-monitor';

const corsOpt = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};

class Server {
    async defineMiddlewares(app, router) {
        app.use(process.env.API_CALL, router);
        app.use(monitor());
        app.use(express.json());
        app.use(cors(corsOpt));
        app.use(express.urlencoded({extended: true}));
        app.use(apiCheck);
        !(process.env.DEV_MODE === 'true') ? app.use(authCheck) : null;
    }
    async main(app, router) {
        await this.defineMiddlewares(app, router);
        await buildRouter(router); // Настроить руты
        await FL.jsonRuleBase(); // Считать базу правил
        await FL.jsonValidTerms(); // Актуальные термы
        await FL.jsonTrapezoidDots(); // Точки трапеций
    }
}

export default new Server();
