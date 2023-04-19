import { buildRouter } from "./router";
import FL from "./services/fuzzy";
import cors from "cors";
import { connectStaticMiddlewares } from "./middlewares";
import monitor from "express-status-monitor";
import bodyParser from "body-parser";
import MysqlCommander from "./mysqlCommander";
import biscuits from 'cookie-parser';
import fs from "fs";
import { skipUrl } from "./middlewares/api-check";
import Misc from "./services/misc";
import FileUpload from 'express-fileupload';

const corsOpt = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

class Server {
  async applyApplets(app) {
    const appletDir = process.env.APPLETS_DIR;
    const applets = fs.readdirSync(appletDir);
    await Misc.logger(`Найдено апплетов ${applets.length} (${applets.join(", ")})`, true);
    for(const applet of applets) {
      const manifest = JSON.parse(fs.readFileSync(`${appletDir}/${applet}/manifest.json`).toString());
      app.use(manifest.call, (await import(`${appletDir}/${applet}`)).default);
      // if(manifest.modulesRequired && manifest.modulesRequired.length != 0) {
      //   for(const module of manifest.modulesRequired) {
      //     app.use((await import(module)).default());
      //   }
      // }
      skipUrl.push(manifest.call);
      await Misc.logger(`Апплет ${manifest.name} подключен. ${manifest.description}.`, true);
    }
  }
  async defineMiddlewares(app, router): Promise<void> {
    app.use(biscuits());
    app.use(FileUpload());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));
    app.use(monitor());
    app.use(cors(corsOpt));
    connectStaticMiddlewares(app);
    process.env.USE_APPLETS === "true" ? await this.applyApplets(app) : null;
    app.use(process.env.API_CALL, router);
  }
  async main(app, router): Promise<boolean> {
    try {
      await this.defineMiddlewares(app, router);
      await buildRouter(router); // Настроить руты
      await FL.jsonRuleBaseIos(); // Считать базу правил для АИС
      // await FL.jsonRuleBase(); // Считать базу правил
      // await FL.jsonValidTerms(); // Актуальные термы
      // await FL.jsonTrapezoidDots(); // Точки трапеций
      await (new MysqlCommander).queryExec("SELECT 1+1;"); // Проверить коннекшн к базе
      return true;
    } catch (e) {
      console.log(
        `Старт сервера невозможен по причине пидарас, точнее ${e.message}`
      );
      return false;
    }
  }
}

export default new Server();
