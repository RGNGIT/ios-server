import fs from "fs";
import MySQL2Commander from "../mysqlCommander";
import { PythonShell } from "python-shell";
import Storage from "../const/object-storage";
import IosStorage from "../const/object-storage-ios";
import Misc from "./misc";

class FuzzyLogic {
  async fetchSystemList() {
    let res = await (new MySQL2Commander).queryExec(`SELECT * FROM term_system;`);
    return res;
  }
  async fetchSystemTermsByKey(Key) {
    let res = await (new MySQL2Commander).queryExec(`SELECT * FROM term WHERE term.Term_System_Key = ${Key};`);
    return res;
  }
  async fetchTermValuesByTermKey(Key) {
    let res = await (new MySQL2Commander).queryExec(`SELECT * FROM term_values WHERE term_values.Term_Key = ${Key};`);
    return res;
  }
  async patchTermValue(Key, Value) {
    let res = await (new MySQL2Commander).queryExec(`UPDATE term_values SET Value = '${Value}' WHERE term_values.Key = ${Key};`);
    return res;
  }
  async fetchStoredStatusMain(Phys_Key, Discip_Key) {
    let res = await (new MySQL2Commander).queryExec(`SELECT * FROM status WHERE status.Phys_Key = ${Phys_Key} AND status.Discip_Key = ${Discip_Key};`);
    return res;
  }
  async fetchStoredStatusIos(Phys_Key, Discip_Key) {
    let res = await (new MySQL2Commander).queryExec(`
    SELECT a.Test_Difficulty, a.Answer_Time, a.Correct_Percentage, b.Time as Topic_Time, a.Result, a.Status, a.DateGot
    FROM ios_status as a, edu_time as b 
    WHERE a.Phys_Key = ${Phys_Key} AND 
    a.Discip_Key = ${Discip_Key} AND 
    a.Topic_Time_Key = b.Key;`);
    return res;
  }
  async jsonRuleBase(system): Promise<void> {
    let res1 = system == 'ios' ? await (new MySQL2Commander).queryExec("SELECT * FROM ios_rule;") : await (new MySQL2Commander).queryExec("SELECT * FROM rule;");
    if (fs.existsSync(process.env.MAMDANI_DIR)) {
      fs.writeFileSync(
        `${process.env.MAMDANI_DIR}/rules.json`,
        JSON.stringify(res1)
      );
      await Misc.logger(
        `Мамдани ${system} инициализирован и готов к работе! (вроде)`,
        true
      );
    } else {
      await Misc.logger(
        "Мамдани не инициализирован! Работа с системой нечеткой логики невозможна!",
        true
      );
    }
  }
  async jsonValidTerms(system): Promise<void> {
    if (fs.existsSync(process.env.MAMDANI_DIR)) {
      fs.writeFileSync(
        `${process.env.MAMDANI_DIR}/terms.json`,
        JSON.stringify(system == 'ios' ? IosStorage.terms : Storage.terms)
      );
    }
  }
  async jsonTrapezoidDots(systemKey): Promise<any> {
    const dots = await (new MySQL2Commander).queryExec(`
    SELECT a.Name as TermName, b.Name as TermValueName, b.Value 
    FROM term as a JOIN term_values as b ON b.Term_Key = a.Key 
    WHERE a.Term_System_Key = ${systemKey};`);
    let jsonBuilder = {};
    for(const chunk of dots) {
      if(!jsonBuilder[chunk.TermName]) {
        jsonBuilder[chunk.TermName] = {};
      }
      jsonBuilder[chunk.TermName][chunk.TermValueName] = chunk.Value;
    }
    if (fs.existsSync(process.env.MAMDANI_DIR)) {
      fs.writeFileSync(
        `${process.env.MAMDANI_DIR}/dots.json`,
        JSON.stringify(jsonBuilder)
      );
    }
    return jsonBuilder;
  }
  async getFuzzyResult(terms: Array<number>): Promise<any> {
    let request: object = {
      mode: "text",
      pythonOptions: ["-u"],
      scriptPath: process.env.MAMDANI_DIR,
      args: [...terms, process.env.MAMDANI_DIR]
    };
    return new Promise((resolve, reject) => {
      PythonShell.run("main.py", request, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

export default new FuzzyLogic();
