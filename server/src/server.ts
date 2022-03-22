import {buildRouter} from './router';
import FL from './services/fuzzy';
import cors from 'cors';
import {connectStaticMiddlewares} from './middlewares';
import monitor from 'express-status-monitor';
import bodyParser from 'body-parser';

const corsOpt = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
};

class Server {
    async defineMiddlewares(app, router): Promise < void > {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(monitor());
        app.use(cors(corsOpt));
        connectStaticMiddlewares(app);
        app.use(process.env.API_CALL, router);
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
