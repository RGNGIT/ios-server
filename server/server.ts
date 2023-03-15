import { buildRouter } from "./router";
import FL from "./services/fuzzy";
import cors from "cors";
import { connectStaticMiddlewares } from "./middlewares";
import monitor from "express-status-monitor";
import bodyParser from "body-parser";
import MysqlCommander from "./mysqlCommander";

const corsOpt = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

class Server {
  async defineMiddlewares(app, router): Promise<void> {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(monitor());
    app.use(cors(corsOpt));
    connectStaticMiddlewares(app);
    app.use(process.env.API_CALL, router);
  }
  async main(app, router): Promise<void> {
    try {
      await this.defineMiddlewares(app, router);
      await buildRouter(router); // Настроить руты
      await FL.jsonRuleBase(); // Считать базу правил
      await FL.jsonValidTerms(); // Актуальные термы
      await FL.jsonTrapezoidDots(); // Точки трапеций
      await MysqlCommander.queryExec("SELECT 1+1;"); // Проверить коннекшн к базе
      app.get("/api/randomShit", (req, res) => {
        res.send(`0
      
        Меньше
        
        Мидл
        
        Наивысший
        
        Мало задач / нет задач
        
        Бэкенд
        
        1
        
        Меньше
        
        Джуниор
        
        Низкий
        
        Мало задач / нет задач
        
        Бэкенд
        
        2
        
        Меньше
        
        Сеньор
        
        Наивысший
        
        Мало задач / нет задач
        
        Бэкенд
        
        3
        
        Меньше
        
        Джуниор
        
        Низкий
        
        Мало задач / нет задач
        
        Фронтенд
        
        4
        
        Меньше
        
        Мидл
        
        Наивысший
        
        Мало задач / нет задач
        
        Фронтенд
        
        5
        
        Меньше
        
        Сеньор
        
        Наивысший
        
        Мало задач / нет задач
        
        Фронтенд
        
        6
        
        Меньше
        
        Мидл
        
        Наивысший
        
        Много задач
        
        Бэкенд
        
        7
        
        Меньше
        
        Джуниор
        
        Наивысший
        
        Много задач
        
        Бэкенд
        
        8
        
        Меньше
        
        Сеньор
        
        Наивысший
        
        Много задач
        
        Бэкенд
        
        9
        
        Меньше
        
        Джуниор
        
        Наивысший
        
        Много задач
        
        Фронтенд
        
        10
        
        Меньше
        
        Мидл
        
        Низкий
        
        Много задач
        
        Фронтенд
        
        11
        
        Меньше
        
        Сеньор
        
        Низкий
        
        Много задач
        
        Фронтенд
        
        12
        
        Меньше
        
        Мидл
        
        Высокий
        
        Мало задач / нет задач
        
        Бэкенд`);
      });
    } catch (e) {
      console.log(
        `Старт сервера невозможен по причине пидарас, точнее ${e.message}`
      );
    }
  }
}

export default new Server();
