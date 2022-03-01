import fs from 'fs';
import MySQL2Commander from '../mysqlCommander';
import {PythonShell} from 'python-shell';

const mamdaniDir = "src/mamdani";

class FuzzyLogic {
    async jsonRuleBase() {
        let res1 = await MySQL2Commander.queryExec("SELECT * FROM rule;");
        if (fs.existsSync(mamdaniDir)) {
            fs.writeFileSync(`${mamdaniDir}/rules.json`, JSON.stringify(res1));
        }
    }
    async jsonValidTerms() {
        const terms = {
            Discipline_Level: [
                "начальный",
                "базовый",
                "средний",
                "сложный",
                "продвинутый"
            ],
            Self_Development: [
                "низкий",
                "ниже среднего",
                "средний",
                "выше среднего",
                "высокий"
            ],
            Responsibility: [
                "низкий",
                "ниже среднего",
                "средний",
                "выше среднего",
                "высокий"
            ],
            Perseverance: [
                "низкий",
                "ниже среднего",
                "средний",
                "выше среднего",
                "высокий"
            ],
            Attentiveness: [
                "низкий",
                "ниже среднего",
                "средний",
                "выше среднего",
                "высокий"
            ],
            Stress: [
                "низкий",
                "ниже среднего",
                "средний",
                "выше среднего",
                "высокий"
            ],
            Result: [
                "новичок",
                "стажер",
                "мастер",
                "профессионал",
                "эксперт"
            ]
        };
        if (fs.existsSync(mamdaniDir)) {
            fs.writeFileSync(`${mamdaniDir}/terms.json`, JSON.stringify(terms));
        }
    }
    async getFuzzyResult(terms : Array < number >) {
        let request: object = {
            mode: 'text',
            pythonOptions: ['-u'],
            scriptPath: 'src/mamdani',
            args: terms
        };
        return new Promise((resolve, reject) => {
            PythonShell.run('new_main.py', request, (err, res) => {
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
