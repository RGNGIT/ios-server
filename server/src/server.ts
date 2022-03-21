import {buildRouter} from './router';
import FL from './services/fuzzy';
import cors from 'cors';
import {connectStaticMiddlewares} from './middlewares';
import express from 'express';
import monitor from 'express-status-monitor';

const corsOpt = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};

class Server {
    async defineMiddlewares(app, router): Promise < void > {
        app.use(process.env.API_CALL, router);
        app.use(monitor());
        app.use(express.json());
        app.use(cors(corsOpt));
        app.use(express.urlencoded({extended: true}));
        connectStaticMiddlewares(app);
    }
    async main(app, router): Promise < void > {
        await this.defineMiddlewares(app, router);
        await buildRouter(router); // Настроить руты
        await FL.jsonRuleBase(); // Считать базу правил
        await FL.jsonValidTerms(); // Актуальные термы
        await FL.jsonTrapezoidDots(); // Точки трапеций
    }
}

export default new Server();
