import MySQL2Commander from '../mysqlCommander';

class Test {
    async validateAnswer(questionKey, answerKey) {
        let answers = await MySQL2Commander.queryExec(`SELECT * FROM ans_variant WHERE Question_Key = ${
            questionKey
        }`);
        for (let answer of answers) {
            if (answer.Key == answerKey && (answer.IsCorrect == 1 || answer.IsCorrect == true)) {
                return {Correct: true};
            }
        }
        return {Correct: false};
    }
    async submitTest(difficulty, name) {
        let res = await MySQL2Commander.queryExec(`INSERT INTO test (Test_Type_Key, Name) VALUES (${
            difficulty
        }, '${
            name
        }');`);
        return res;
    }
    async fetchDifficultyList() {
        let res = await MySQL2Commander.queryExec("SELECT * FROM test_type;");
        return res;
    }
    async writeQuestion(testKey, questionName) {
        let res = await MySQL2Commander.queryExec(`INSERT INTO test_question (Test_Key, Header) VALUES (${
            testKey
        }, '${
            questionName
        }');`);
        return res;
    }
    async writeAnswers(text, isCorrect, questionKey) {
        let res = await MySQL2Commander.queryExec(`INSERT INTO ans_variant (Text, IsCorrect, Question_Key) VALUES ('${
            text
        }', ${
            isCorrect
        }, ${
            questionKey
        });`);
        return res;
    }
    async fetchQuestions(orderBy) {
        let res = await MySQL2Commander.queryExec(`SELECT * FROM test_question ORDER BY '${orderBy}';`);
        return res;
    }
    async fetchTopicList() {
        let res = await MySQL2Commander.queryExec("SELECT test.Key, test.Name, test_type.TName FROM test_type, test WHERE Test_Type_Key = test_type.Key;");
        return res;
    }
    async fetchQuestionsByKey(key) {
        let res = await MySQL2Commander.queryExec(`SELECT * FROM test_question WHERE Test_Key = ${
            key
        };`);
        return res;
    }
    async fetchAnswerVariantsByKey(key) {
        let res = await MySQL2Commander.queryExec(`SELECT * FROM ans_variant WHERE Question_Key = ${
            key
        }`);
        return res;
    }
}

export default new Test();
