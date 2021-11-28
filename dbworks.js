const mysql = require('mysql2');
require('dotenv').config();
module.exports.stablishedConnection = () => {
console.log("Коннекшн открыт. Выполняю запрос...");
return new Promise((resolve, reject) => {
  const connection = mysql.createConnection( {
    host: "db.19ivt.ru",
    user: "osu",
    database: "vimya",
    password: "12345"
  });
  connection.connect((err) => {
    if(err){
      reject(err);
    }
    resolve(connection);
  });
})
}
module.exports.closeDbConnection = (connection, reason) => {
  connection.destroy();
  return "Закрыл коннекшн после запроса " + reason + " " + JSON.stringify({host:connection.config.host, user:connection.config.user, database:connection.config.database, port:connection.config.port}) + "\nЩа высрет ошибку, но ты не волнуйся, вот она, после возврата:";
}