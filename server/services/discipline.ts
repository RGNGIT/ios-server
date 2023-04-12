import MySQL2Commander from "../mysqlCommander";

class DisciplineService {
  async addNew(Name, ShName) {
    await (new MySQL2Commander).queryExec(`INSERT INTO discipline (Name, ShName) VALUES ('${Name}', '${ShName}');`);
  }
  async fetchAll() {
    let res = await (new MySQL2Commander).queryExec(`SELECT * FROM discipline;`);
    return res;
  }
  async fetchOneByKey(Key) {
    let res = await (new MySQL2Commander).queryExec(`SELECT * FROM discipline WHERE discipline.Key = ${Key};`);
    return res;
  }
  async fetchOneByName(Name) {
    let res = await (new MySQL2Commander).queryExec(`SELECT * FROM discipline WHERE discipline.Name = '${Name}';`);
    return res;
  }
  async addNewTopic(Name, Number, DiscipKey, Weight) {
    await (new MySQL2Commander).queryExec(`INSERT INTO topic (Name, Number, Discip_Key, Topic_Weight) VALUES ('${Name}', ${Number}, ${DiscipKey}, ${Weight});`);
  }
  async fetchAllTopics() {
    let res = await (new MySQL2Commander).queryExec(`SELECT * FROM topic;`);
    return res;
  }
  async addNewTopicMaterial(File_Link, Diff_Level_Key, Topic_Key, Test_Key) {
    await (new MySQL2Commander).queryExec(`INSERT INTO topic_material (File_Link, Diff_Level_Key, Topic_Key, Test_Key) VALUES ('${File_Link}', ${Diff_Level_Key}, ${Topic_Key}, ${Test_Key});`);
  }
  async connectUserDiscipline(Phys_Key, Discip_Key) {
    await (new MySQL2Commander).queryExec(`INSERT INTO user_discipline (Phys_Key, Discip_Key) VALUES (${Phys_Key}, ${Discip_Key});`);
  }
  async fetchDiscpilinesOfUser(Phys_Key) {
    const res = await (new MySQL2Commander).queryExec(
      `SELECT discipline.Key, discipline.Name, discipline.ShName 
      FROM discipline, user_discipline 
      WHERE user_discipline.Phys_Key = ${Phys_Key} AND 
      discipline.Key = user_discipline.Discip_Key;`);
    return res;
  }
  async fetchTopicsByDiscipline(Key, Diff_Level_Key?) {
    const res = await (new MySQL2Commander).queryExec(`
    SELECT 
    a.Key as TopicKey, 
    a.Name, 
    a.Number, 
    a.Topic_Weight, 
    b.Key as MaterialKey,
    b.Diff_Level_Key,
    b.File_Link,
    b.Test_Key
    FROM topic as a, topic_material as b 
    WHERE a.Discip_Key = ${Key} AND a.Key = b.Topic_Key ${(Diff_Level_Key ? `AND b.Diff_Level_Key = ${Diff_Level_Key}` : ``)};`);
    return res;
  }
}

export default new DisciplineService();