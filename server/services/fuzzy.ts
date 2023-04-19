import fs from "fs";
import MySQL2Commander from "../mysqlCommander";
import { PythonShell } from "python-shell";
import Storage from "../const/object-storage";
import IosStorage from "../const/object-storage-ios";
import Misc from "./misc";

class FuzzyLogic {
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
  async jsonRuleBaseIos(): Promise<void> {
    let res1 = await (new MySQL2Commander).queryExec("SELECT * FROM ios_rule;");
    if (fs.existsSync(process.env.MAMDANI_DIR)) {
      fs.writeFileSync(
        `${process.env.MAMDANI_DIR}/rules.json`,
        JSON.stringify(res1)
      );
      await Misc.logger(
        "Мамдани АИС инициализирован и готов к работе! (вроде)",
        true
      );
    } else {
      await Misc.logger(
        "Мамдани АИС не инициализирован! Работа с системой нечеткой логики невозможна!",
        true
      );
    }
  }
  async jsonRuleBase(): Promise<void> {
    let res1 = await (new MySQL2Commander).queryExec("SELECT * FROM rule;");
    if (fs.existsSync(process.env.MAMDANI_DIR)) {
      fs.writeFileSync(
        `${process.env.MAMDANI_DIR}/rules.json`,
        JSON.stringify(res1)
      );
      await Misc.logger(
        "Мамдани инициализирован и готов к работе! (вроде)",
        true
      );
    } else {
      await Misc.logger(
        "Мамдани не инициализирован! Работа с системой нечеткой логики невозможна!",
        true
      );
    }
  }
  async jsonValidTerms(): Promise<void> {
    if (fs.existsSync(process.env.MAMDANI_DIR)) {
      fs.writeFileSync(
        `${process.env.MAMDANI_DIR}/terms.json`,
        JSON.stringify(Storage.terms)
      );
    }
  }
  async jsonValidTermsIos(): Promise<void> {
    if (fs.existsSync(process.env.MAMDANI_DIR)) {
      fs.writeFileSync(
        `${process.env.MAMDANI_DIR}/terms.json`,
        JSON.stringify(IosStorage.terms)
      );
    }
  }
  async jsonTrapezoidDots(): Promise<void> {
    if (fs.existsSync(process.env.MAMDANI_DIR)) {
      fs.writeFileSync(
        `${process.env.MAMDANI_DIR}/dots.json`,
        JSON.stringify(Storage.dots)
      );
    }
  }
  async jsonTrapezoidDotsIos(): Promise<void> {
    if (fs.existsSync(process.env.MAMDANI_DIR)) {
      fs.writeFileSync(
        `${process.env.MAMDANI_DIR}/dots.json`,
        JSON.stringify(IosStorage.dots)
      );
    }
  }
  async getFuzzyResult(terms: Array<number>, ios: boolean): Promise<any> {
    const termsMain = [
      `Discipline_Level:${terms[0]}`, 
      `Self_Development:${terms[1]}`, 
      `Responsibility:${terms[2]}`, 
      `Perseverance:${terms[3]}`, 
      `Attentiveness:${terms[4]}`, 
      `Stress:${terms[5]}`
    ];
    const termsIos = [
      `Test_Difficulty:${terms[0]}`, 
      `Answer_Time:${terms[1]}`, 
      `Correct_Percentage:${terms[2]}`, 
      `Topic_Time:${terms[3]}`
    ]
    let request: object = {
      mode: "text",
      pythonOptions: ["-u"],
      scriptPath: process.env.MAMDANI_DIR,
      args: ios ? [...termsIos, process.env.MAMDANI_DIR] : [...termsMain, process.env.MAMDANI_DIR]
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
