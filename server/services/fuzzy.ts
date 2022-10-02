import fs from "fs";
import MySQL2Commander from "../mysqlCommander";
import { PythonShell } from "python-shell";
import Storage from "../const/object-storage";
import Misc from "./misc";

class FuzzyLogic {
  async jsonRuleBase(): Promise<void> {
    let res1 = await MySQL2Commander.queryExec("SELECT * FROM rule;");
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
  async jsonTrapezoidDots(): Promise<void> {
    if (fs.existsSync(process.env.MAMDANI_DIR)) {
      fs.writeFileSync(
        `${process.env.MAMDANI_DIR}/dots.json`,
        JSON.stringify(Storage.dots)
      );
    }
  }
  async getFuzzyResult(terms: Array<number>): Promise<any> {
    let request: object = {
      mode: "text",
      pythonOptions: ["-u"],
      scriptPath: process.env.MAMDANI_DIR,
      args: [...terms, process.env.MAMDANI_DIR],
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
