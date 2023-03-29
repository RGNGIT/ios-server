import MySQL2Commander from "../mysqlCommander";

class RuleService {
  async fetchRuleByKey(key) {
    let res = await MySQL2Commander.queryExec(
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
    let res = await MySQL2Commander.queryExec(
      `INSERT INTO rule (Discipline_Level, Self_Development, Responsibility, Perseverance, Attentiveness, Stress, Result) VALUES ('${disciplineLevel}', '${selfDevelopment}', '${responsibility}', '${perseverance}', '${attentiveness}', '${stress}', '${result}');`
    );
    return res;
  }
  async fetchRules(orderBy) {
    let res = await MySQL2Commander.queryExec(
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
    let res = await MySQL2Commander.queryExec(
      `UPDATE rule SET Discipline_Level = '${disciplineLevel}', Self_Development = '${selfDevelopment}', Responsibility = '${responsibility}', Perseverance = '${perseverance}', Attentiveness = '${attentiveness}', Stress = '${stress}', Result = '${result}' WHERE rule.Key = ${key};`
    );
    return res;
  }
}

export default new RuleService();
