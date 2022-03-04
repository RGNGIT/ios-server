import fs from 'fs';
import MySQL2Commander from '../mysqlCommander';
import {PythonShell} from 'python-shell';
import Storage from '../const/object-storage';

class FuzzyLogic {
    async jsonRuleBase() {
        let res1 = await MySQL2Commander.queryExec("SELECT * FROM rule;");
        if (fs.existsSync(process.env.MAMDANI_DIR)) {
            fs.writeFileSync(`${
                process.env.MAMDANI_DIR
            }/rules.json`, JSON.stringify(res1));
        }
    }
    async jsonValidTerms() {

        if (fs.existsSync(process.env.MAMDANI_DIR)) {
            fs.writeFileSync(`${
                process.env.MAMDANI_DIR
            }/terms.json`, JSON.stringify(Storage.terms));
        }
    }
    async jsonTrapezoidDots() {

        if (fs.existsSync(process.env.MAMDANI_DIR)) {
            fs.writeFileSync(`${
                process.env.MAMDANI_DIR
            }/dots.json`, JSON.stringify(Storage.dots));
        }
    }
    async getFuzzyResult(terms : Array < number >) {
        let request: object = {
            mode: 'text',
            pythonOptions: ['-u'],
            scriptPath: process.env.MAMDANI_DIR,
            args: terms
        };
        return new Promise((resolve, reject) => {
            PythonShell.run('main.py', request, (err, res) => {
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
