import path from "path";
import express from "express";
import Server from "./server";
var colors = require('colors');

colors.enable();
const app = express();
const router = express.Router();
require("dotenv").config();

// Главная точка входа

(async function (): Promise<void> {
  await path.join(__dirname, "../front");
  const startOrNotToStart = await Server.main(app, router);
  if(startOrNotToStart) {
    await app.listen(process.env.PORT, () => {
      console.log(colors.rainbow(
        "Сервак им. Тагировой стартанул на порту: " +
          process.env.PORT + ". ") +
          (process.env.DEV_MODE == "true" ? 
          colors.red.underline("Режим разработчика включен.") : 
          colors.green("Режим разработчика выключен.")));
    });
  }
})();
