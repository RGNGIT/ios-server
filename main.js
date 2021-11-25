const express = require("express");
const oursql = require("mysql2");
const cors = require("cors");
//const bodyParser = require('body-parser');
//const cors = require('cors');
//const morgan = require('morgan');

const app = express();
const connection = oursql.createConnection({
   host: "db.19ivt.ru",
   user: "osu",
   database: "vimya",
   password: "12345"
});

connection.connect((err) => {
   if(err) {
      console.log(err);
   } else {
      console.log("Подрубился к базе ебать");
   }
});

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
});

app.get('/submitQuestion', (req, res) => {
   logger("Какой-то бесстрашный на " + req.connection.remoteAddress + " добавил вопрос в базу " + '(' + JSON.stringify(req.query) + '). Ну и че по итогам:', true);
   res.charset = "utf-8"; req.charset = "utf-8";
   connection.query("INSERT INTO test_question (Test_Key, Header) VALUES (" + req.query.Testkey + ", '" + req.query.questionName + "');",
   (err1, res1, fields1) => {
      if(err1) { logger(err1, false); res.send("Ошибочка"); } else logger(JSON.stringify(res1), false);
      connection.query("SELECT * FROM test_question ORDER BY 'Key' DESC LIMIT 1;", 
      (err2, res2, fields2) => {
         if(err2) { logger(err2, false); res.send("Ошибочка"); } else logger(JSON.stringify(res2), false);
         for(var i of req.query.varArr) {
         connection.query("INSERT INTO ans_variant (Text, IsCorrect, Question_Key) VALUES ('" + JSON.parse(i).varName + "', " + JSON.parse(i).correct + ", " + res2[0].Key + ");", 
         (err3, res3, fields3) => {
            if(err3) { logger(err3, false); res.send("Ошибочка"); } else logger(JSON.stringify(res3), false);
         });
      }
      });
   });
});

app.get('/getAllQuestions', (req, res) => {
   res.charset = "utf-8"; req.charset = "utf-8";
   class TestBlock {
      TestType;
      TypeKey;
      QuestionsAmount;
      QuestionBlock = [];
   }
   class QuestionBlock {
      Header;
      TestKey;
      AnsVar = [];
   }
   class AnswerBlock {
      Text;
      IsCorrect;
      ImgKey;
      QuestionKey;
   }
   let ToReturn = [];
   connection.query("SELECT test.Key, Test_Type_Key, Link, quality_type.Name, Question_Amount FROM test, quality_type WHERE test.Test_Type_Key = quality_type.Key;", 
   (errTest, resTest, fieldsTest) => {
      for(var i of resTest) {
         let TempTestBlock = new TestBlock;
         console.log(i);
      }
   });
});

var listener = app.listen(process.env.PORT || 3000, () => {
   console.log("Высираюсь на порт " + listener.address().port);
});
