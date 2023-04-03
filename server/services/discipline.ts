import MySQL2Commander from "../mysqlCommander";

class DisciplineService {
  async addNew(Name, ShName) {
    await MySQL2Commander.queryExec(`INSERT INTO discipline (Name, ShName) VALUES ('${Name}', '${ShName}');`);
  }
  async fetchAll() {
    let res = await MySQL2Commander.queryExec(`SELECT * FROM discipline;`);
    return res;
  }
  async fetchOneByKey(Key) {
    let res = await MySQL2Commander.queryExec(`SELECT * FROM discipline WHERE discipline.Key = ${Key};`);
    return res;
  }
  async fetchOneByName(Name) {
    let res = await MySQL2Commander.queryExec(`SELECT * FROM discipline WHERE discipline.Name = '${Name}';`);
    return res;
  }
  async addNewTopic(Name, Number, DiscipKey, Weight) {
    await MySQL2Commander.queryExec(`INSERT INTO topic (Name, Number, Discip_Key, Topic_Weight) VALUES ('${Name}', ${Number}, ${DiscipKey}, ${Weight});`);
  }
  async fetchAllTopics() {
    let res = await MySQL2Commander.queryExec(`SELECT * FROM topic;`);
    return res;
  }
  async addNewTopicMaterial(File_Link, Diff_Level_Key, Topic_Key, Test_Key) {
    await MySQL2Commander.queryExec(`INSERT INTO topic_material (File_Link, Diff_Level_Key, Topic_Key, Test_Key) VALUES ('${File_Link}', ${Diff_Level_Key}, ${Topic_Key}, ${Test_Key});`);
  }
}

export default new DisciplineService();