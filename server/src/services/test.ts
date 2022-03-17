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
}

export default new Test();
