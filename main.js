const express = require("express");
const oursql = require("mysql2");
const cors = require("cors");
const { stablishedConnection, closeDbConnection }  = require('./dbworks');
//const bodyParser = require('body-parser');
//const cors = require('cors');
//const morgan = require('morgan');

const app = express();

const corsOpt = {
   origin: '*', 
   credentials: true,
   optionSuccessStatus: 200
};

//app.use(modrgan('combine'));
//app.use(bodyParser.json());
app.use(cors(corsOpt));

function logger(log, dt) {
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
console.log((dt ? '<' + dateTime + '> ' : '') + log);
}

// Запросеки

app.get('/doSomething', (req, res) => 
{

});

app.get('/getTopicList', (req, res) => {
   logger("Какой-то бесстрашный на " + req.connection.remoteAddress + " запросил список тем. Ну и че по итогам:", true);
   res.charset = "utf-8"; req.charset = "utf-8";
   stablishedConnection().then((connection) => {
      connection.query("SELECT test.Key, test.Name, test_type.TName FROM test_type, test WHERE Test_Type_Key = test_type.Key;",
      function (err, results, fields) {
         if(err) {
            logger(err, false);
            res.send("Ошибочка");
         } else {
            logger("Типа вернул: " + JSON.stringify(results), false);
            res.json(results);
         }
      });
      logger(closeDbConnection(connection, "GET_TOPIC_LIST"), false);
   });
});

app.get('/submitQuestion', (req, res) => {
   logger("Какой-то бесстрашный на " + req.connection.remoteAddress + " добавил вопрос в базу " + '(' + JSON.stringify(req.query) + '). Ну и че по итогам:', true);
   res.charset = "utf-8"; req.charset = "utf-8";
   stablishedConnection().then((connection) => {
      connection.query("INSERT INTO test_question (Test_Key, Header) VALUES (" + req.query.Testkey + ", '" + req.query.questionName + "');",
      (err1, res1, fields1) => {
         if(err1) { logger(err1, false); res.send("Ошибочка"); } else logger(JSON.stringify(res1), false);
         connection.query("SELECT * FROM test_question ORDER BY 'Key';", 
         (err2, res2, fields2) => {
            if(err2) { logger(err2, false); res.send("Ошибочка"); } else logger(JSON.stringify(res2), false);
            for(var i of req.query.varArr) {
            connection.query("INSERT INTO ans_variant (Text, IsCorrect, Question_Key) VALUES ('" + JSON.parse(i).varName + "', " + JSON.parse(i).correct + ", " + res2[res2.length - 1].Key + ");", 
            (err3, res3, fields3) => {
               if(err3) { logger(err3, false); res.send("Ошибочка"); } else logger(JSON.stringify(res3), false);
            });
         }
         });
      });
      closeDbConnection(connection, "SUBMIT_QUESTION");
   });
});

app.get("/getDiffList", (req, res) => {
   logger("Какой-то бесстрашный на " + req.connection.remoteAddress + " запросил список уровней сложности тестов. Ну и че по итогам:", true);
   res.charset = "utf-8"; req.charset = "utf-8";
   stablishedConnection().then((connection) => {
      connection.query("SELECT * FROM test_type;",
      (err, results, fields) => {
         if(err) {
            logger(err, false);
            res.send("Ошибочка");
         } else {
            logger("Типа вернул: " + JSON.stringify(results), false);
            res.json(results);
         }
      });
      logger(closeDbConnection(connection, "GET_DIFF_LIST"), false);
   });
});

app.get("/submitTest", (req, res) => {
   logger("Какой-то бесстрашный на " + req.connection.remoteAddress + " добавил тестик " + '(' + JSON.stringify(req.query) + "). Ну и че по итогам:", true);
   res.charset = "utf-8"; req.charset = "utf-8";
   stablishedConnection().then((connection) => {
      connection.query("INSERT INTO test (Test_Type_Key, Name) VALUES (" + req.query.difficulty + ", '" + req.query.name + "');",
      (err, results, fields) => {
         if(err) { logger(err, false); res.send("Ошибочка"); } else logger(JSON.stringify(results), false);
      });
      closeDbConnection(connection, "SUBMIT_TEST");
   });
});

var listener = app.listen(process.env.PORT || 8000, () => {
   console.log("Сервак им. Тагировой стартанул на порту: " + listener.address().port);
});
