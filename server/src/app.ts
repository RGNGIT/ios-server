import path from 'path';
import express from 'express';
import Server from './server';

const app = express();
require('dotenv').config();

// Главная точка входа

(async function () {
    await path.join(__dirname, "../../../front");
    await Server.defaultMiddlewares(app);
    await Server.main(app);
    await app.listen(process.env.PORT, () => {
        console.log("Сервак им. Тагировой стартанул на порту: " + process.env.PORT);
    });
})();