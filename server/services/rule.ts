import MySQL2Commander from "../mysqlCommander";
import Misc from "./misc";

class RuleService {
  async fetchRuleByKey(key) {
    let res = await (new MySQL2Commander).queryExec(
      `SELECT * FROM rule WHERE rule.Key = ${key};`
    );
    return res[0];
  }
  async writeRule(
    disciplineLevel,
    selfDevelopment,
    responsibility,
    perseverance,
    attentiveness,
    stress,
    result
  ) {
    let res = await (new MySQL2Commander).queryExec(
      `INSERT INTO rule (Discipline_Level, Self_Development, Responsibility, Perseverance, Attentiveness, Stress, Result) VALUES ('${disciplineLevel}', '${selfDevelopment}', '${responsibility}', '${perseverance}', '${attentiveness}', '${stress}', '${result}');`
    );
    return res;
  }
  async fetchRules(orderBy) {
    let res = await (new MySQL2Commander).queryExec(
      `SELECT * FROM rule ORDER BY ${orderBy};`
    );
    return res;
  }
  async updateRule(
    disciplineLevel,
    selfDevelopment,
    responsibility,
    perseverance,
    attentiveness,
    stress,
    result,
    key
  ) {
    let res = await (new MySQL2Commander).queryExec(
      `UPDATE rule SET Discipline_Level = '${disciplineLevel}', Self_Development = '${selfDevelopment}', Responsibility = '${responsibility}', Perseverance = '${perseverance}', Attentiveness = '${attentiveness}', Stress = '${stress}', Result = '${result}' WHERE rule.Key = ${key};`
    );
    return res;
  }
  async writeIosRule(block: { Test_Difficulty, Answer_Time, Correct_Percentage, Topic_Time, Result }) {
    const res = await (new MySQL2Commander).queryExec(`INSERT INTO ios_rule (${Object.keys(block).join(", ")}) VALUES (${Object.values(block).join(", ")});`);
    return res;
  }
  async fetchIosRuleList() {
    const res = await (new MySQL2Commander).queryExec(`SELECT * FROM ios_rule;`);
    return res;
  }
  async updateIosRuleByKey(Key, block: { Test_Difficulty, Answer_Time, Correct_Percentage, Topic_Time, Result }) {
    const res = await (new MySQL2Commander).queryExec(`UPDATE ios_rule SET ${Misc.formSets(block)} WHERE ios_rule.Key = ${Key};`);
    return res;
  }
}

export default new RuleService();
