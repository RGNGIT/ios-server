import MySQL2Commander from "../mysqlCommander";

class Test {
  async validateAnswer(questionKey, answerKey) {
    let answers = await (new MySQL2Commander).queryExec(
      `SELECT * FROM ans_variant WHERE Question_Key = ${questionKey}`
    );
    for (let answer of answers) {
      if (
        answer.Key == answerKey &&
        (answer.IsCorrect == 1 || answer.IsCorrect == true)
      ) {
        return { Correct: true };
      }
    }
    return { Correct: false };
  }
  async getLastRecord(array) {
    return array[array.length - 1];
  }
  async submitTest(difficulty, name) {
    let res = await (new MySQL2Commander).queryExec(
      `INSERT INTO test (Test_Type_Key, Name) VALUES (${difficulty}, '${name}')`
    );
    return res;
  }
  async getLastTest() {
    let res = await (new MySQL2Commander).queryExec(`SELECT * FROM test;`);
    return this.getLastRecord(res);
  }
  async fetchTestsByTypeKey(typeKey) {
    let res = await (new MySQL2Commander).queryExec(
      `SELECT * FROM test WHERE test.Test_Type_Key = ${typeKey};`
    );
    return res;
  }
  async fetchDifficultyList() {
    let res = await (new MySQL2Commander).queryExec("SELECT * FROM test_type;");
    return res;
  }
  async writeQuestion(testKey, questionName, imgKey?) {
    let res;
    if(imgKey) {
      res = await (new MySQL2Commander).queryExec(
        `INSERT INTO test_question (Test_Key, Header, Img_Key) VALUES (${testKey}, '${questionName}', ${imgKey});`
      );
    } else {
      res = await (new MySQL2Commander).queryExec(
        `INSERT INTO test_question (Test_Key, Header) VALUES (${testKey}, '${questionName}');`
      );
    }
    return res;
  }
  async writeAnswer(text, isCorrect, questionKey, Img_Key?) {
    let res;
    if(Img_Key) {
      res = await (new MySQL2Commander).queryExec(
        `INSERT INTO ans_variant (Text, IsCorrect, Question_Key, Img_Key) VALUES ('${text}', ${isCorrect}, ${questionKey}, '${Img_Key}');`
      );
    } else {
      res = await (new MySQL2Commander).queryExec(
        `INSERT INTO ans_variant (Text, IsCorrect, Question_Key) VALUES ('${text}', ${isCorrect}, ${questionKey});`
      );
    }
    return res;
  }
  async fetchQuestions(orderBy) {
    let res = await (new MySQL2Commander).queryExec(
      `SELECT * FROM test_question ORDER BY '${orderBy}';`
    );
    return res;
  }
  async fetchTopicList() {
    let res = await (new MySQL2Commander).queryExec(
      "SELECT test.Key, test.Name, test_type.TName FROM test_type, test WHERE Test_Type_Key = test_type.Key;"
    );
    return res;
  }
  async fetchQuestionsByKey(key) {
    let res = await (new MySQL2Commander).queryExec(
      `SELECT * FROM test_question WHERE Test_Key = ${key};`
    );
    return res;
  }
  async fetchAnswerVariantsByKey(key) {
    let res = await (new MySQL2Commander).queryExec(
      `SELECT * FROM ans_variant WHERE Question_Key = ${key}`
    );
    return res;
  }
  async fetchTestList() {
    let res = await (new MySQL2Commander).queryExec('SELECT * FROM test;');
    return res;
  }
  async fetchTestMetaByKey(key) {
    let res = await (new MySQL2Commander).queryExec(`SELECT * FROM test WHERE test.Key = ${key};`);
    return res;
  }
  async deleteAnswerByKey(Key) {
    let res = await (new MySQL2Commander).queryExec(`DELETE FROM ans_variant WHERE ans_variant.Key = ${Key}`);
    return res;
  }
  async updateTestByKey(Key, name, type) {
    let res = await (new MySQL2Commander).queryExec(`UPDATE test SET test.Name = '${name}', test.Test_Type_Key = ${type} WHERE test.Key = ${Key}`);
    return res;
  }
  async updateQuestionByKey(Key, header, imgKey?) {
    let res;
    if(imgKey) {
      res = await (new MySQL2Commander).queryExec(`UPDATE test_question SET test_question.Header = '${header}', test_question.Img_Key = ${imgKey} WHERE test_question.Key = ${Key}`);
    } else {
      res = await (new MySQL2Commander).queryExec(`UPDATE test_question SET test_question.Header = '${header}' WHERE test_question.Key = ${Key}`);
    }
    return res;
  }
  async updateAnswerByKey(Key, {text, isCorrect}, Img_Key?) {
    let res;
    if(Img_Key) {
      res = await (new MySQL2Commander).queryExec(`UPDATE ans_variant SET ans_variant.Text = '${text}', ans_variant.IsCorrect = ${isCorrect}, ans_variant.Img_Key = '${Img_Key}' WHERE ans_variant.Key = ${Key}`);
    } else {
      res = await (new MySQL2Commander).queryExec(`UPDATE ans_variant SET ans_variant.Text = '${text}', ans_variant.IsCorrect = ${isCorrect} WHERE ans_variant.Key = ${Key}`);
    }
    return res;
  }
  async deleteTestByKey(Key) {
    let res = await (new MySQL2Commander).queryExec(`DELETE FROM test WHERE test.Key = ${Key}`);
    return res;
  }
  async deleteQuestionByKey(Key) {
    let res = await (new MySQL2Commander).queryExec(`DELETE FROM test_question WHERE test_question.Key = ${Key}`);
    return res;
  }
  async addToDiscipline(Discip_Key, Test_Key) {
    await (new MySQL2Commander).queryExec(`UPDATE discipline SET Entry_Test_Key = ${Test_Key} WHERE discipline.Key = ${Discip_Key};`);
  }
  async addTestResult(Phys_Key, Test_Key, Result, Discip_Key) {
    if(Discip_Key) {
      await (new MySQL2Commander).queryExec(`INSERT INTO test_results (Phys_Key, Test_Key, Result, Discip_Key) VALUES (${Phys_Key}, ${Test_Key}, '${Result}', ${Discip_Key});`);
    } else {
      await (new MySQL2Commander).queryExec(`INSERT INTO test_results (Phys_Key, Test_Key, Result) VALUES (${Phys_Key}, ${Test_Key}, '${Result}');`);
    }
  }
  async writeImg(fileKey) {
    if(fileKey != "NULL") {
      await (new MySQL2Commander).queryExec(`INSERT INTO img (File) VALUES ('${fileKey}')`);
    }
    return this.getLastRecord(await (new MySQL2Commander).queryExec(`SELECT * FROM img;`));
  }
  async setQuestionImageToNull(Key) {
    await (new MySQL2Commander).queryExec(`UPDATE test_question SET test_question.Img_Key = NULL WHERE test_question.Key = ${Key};`);
  }
  async setAnswerImageToNull(Key) {
    await (new MySQL2Commander).queryExec(`UPDATE ans_variant SET ans_variant.Img_Key = NULL WHERE ans_variant.Key = ${Key};`);
  }
  async fetchImgByKey(Key) {
    const res = await (new MySQL2Commander).queryExec(`SELECT * FROM img WHERE img.Key = ${Key};`);
    return res[0];
  }
  async getTestResult(Phys_Key) {
    const res = await (new MySQL2Commander).queryExec(`SELECT * FROM test_results WHERE test_results.Phys_Key = ${Phys_Key};`);
    return res;
  }
  async fetchTestTypeByKey(Key) {
    const res = await (new MySQL2Commander).queryExec(`SELECT * FROM test_type WHERE test_type.Key = ${Key};`);
    return res[0];
  }
  async fetchDisciplineWithEntryTest(Key) {
    const res = await (new MySQL2Commander).queryExec(`SELECT * FROM discipline WHERE discipline.Entry_Test_Key = ${Key};`);
    return res;
  }
  async detachEntryTests(Disciplines) {
    const updateString = (Key) => `UPDATE discipline SET discipline.Entry_Test_Key = NULL WHERE discipline.Key = ${Key};`;
    let request = "";
    for(const discipline of Disciplines) {
      request += updateString(discipline.Key);
    }
    await (new MySQL2Commander).queryExec(request);
  }
  async fetchTestResults(Phys_Key, Discip_Key) {
    const res = await (new MySQL2Commander).queryExec(`SELECT * FROM test_results WHERE test_results.Phys_Key = ${Phys_Key} AND test_results.Discip_Key = ${Discip_Key};`);
    return res;
  }
}

export default new Test();