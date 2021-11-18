const express = require("express");
const oursql = require("mysql2");
const cors = require("cors");
//const { queuePostFlushCb } = require("vue-demi");
//const bodyParser = require('body-parser');
//const cors = require('cors');
//const morgan = require('morgan');

const app = express();
const connection = oursql.createConnection({
   host: "localhost",
   user: "osu",
   database: "vimya",
   password: "12345"
});

connection.connect((err) => {
   if(err) {
      console.log(err);
   } else {
      console.log("Я подрубился ебать");
   }
});

const corsOpt = {
   origin: '*', 
   credentials: true,            //access-control-allow-credentials:true
   optionSuccessStatus: 200
};

//app.use(modrgan('combine'));
//app.use(bodyParser.json());
app.use(cors(corsOpt));

// Запросеки

app.get('/doSomething', (req, res) => 
{
   console.log(DBGet("*", "test", ""));
});


app.get('/submitQuestion', (req, res) => 
{
   console.log(req.query);
   if(SubmitQuestion(req.query)) {
      res.send("Вопросек успешно добавлен в базу!");
   } else {
      res.send("Ошибочка");
   }
});

// Функции

function SubmitQuestion() {
   return false;
}

// INSERT INTO /table/ (/columns/) (/values/)
function DBAdd(table, columns, values) {
   connection.query("INSERT INTO " + table + " (" + columns + ") VALUES (" + values + ");");
}

// SELECT (/cells/) FROM (/tables/) WHERE (/param/)
function DBGet(cells, tables, param) {
   res = null;
   connection.query("SELECT " + cells + " FROM " + tables + " " + param + ';',
   function Exec(err, results, fields) {
     console.log(err);
     console.log(results);
     console.log(fields);
 });
}

app.listen(process.env.PORT || 8080);
