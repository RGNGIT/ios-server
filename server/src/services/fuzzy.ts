import fs from 'fs';
import MySQL2Commander from '../mysqlCommander';
import {PythonShell} from 'python-shell';

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
        if (fs.existsSync(process.env.MAMDANI_DIR)) {
            fs.writeFileSync(`${
                process.env.MAMDANI_DIR
            }/terms.json`, JSON.stringify(terms));
        }
    }
    async jsonTrapezoidDots() {
        const dots = {
            Discipline_Level: {
                Begin_Level: {
                    x: [
                        0, 35, 40
                    ],
                    y: [1.0, 1.0, 0]
                },
                Base_Level: {
                    x: [
                        35, 40, 55, 60
                    ],
                    y: [0, 1.0, 1.0, 0]
                },
                Mid_Level: {
                    x: [
                        55, 60, 75, 80
                    ],
                    y: [0, 1.0, 1.0, 0]
                },
                Enhanced_Level: {
                    x: [
                        75, 80, 90, 95
                    ],
                    y: [0, 1.0, 1.0, 0]
                },
                Hard_Level: {
                    x: [
                        90, 95, 100
                    ],
                    y: [0, 1.0, 1.0]
                }
            },
            Self_Development: {
                Low_Level: {
                    x: [
                        0, 25, 40
                    ],
                    y: [1.0, 1.0, 0]
                },
                Below_Mid_Level: {
                    x: [
                        30, 43, 47, 57
                    ],
                    y: [0, 1.0, 1.0, 0]
                },
                Mid_Level: {
                    x: [
                        50, 60, 67, 77
                    ],
                    y: [0, 1.0, 1.0, 0]
                },
                Above_Mid_Level: {
                    x: [
                        67, 80, 85, 95
                    ],
                    y: [0, 1.0, 1.0, 0]
                },
                High_Level: {
                    x: [
                        83, 90, 100
                    ],
                    y: [0, 1.0, 1.0]
                }
            },
            Responsibility: {
                Low_Level: {
                    x: [
                        0, 15, 20
                    ],
                    y: [1.0, 1.0, 0]
                },
                Below_Mid_Level: {
                    x: [
                        15, 25, 35, 43
                    ],
                    y: [0, 1.0, 1.0, 0]
                },
                Mid_Level: {
                    x: [
                        33, 45, 55, 63
                    ],
                    y: [0, 1.0, 1.0, 0]
                },
                Above_Mid_Level: {
                    x: [
                        55, 65, 75, 80
                    ],
                    y: [0, 1.0, 1.0, 0]
                },
                High_Level: {
                    x: [
                        75, 85, 100
                    ],
                    y: [0, 1.0, 1.0]
                }
            },
            Perseverance: {
                Low_Level: {
                    x: [
                        0, 15, 20
                    ],
                    y: [1.0, 1.0, 0]
                },
                Below_Mid_Level: {
                    x: [
                        15, 25, 35, 43
                    ],
                    y: [0, 1.0, 1.0, 0]
                },
                Mid_Level: {
                    x: [
                        33, 45, 55, 63
                    ],
                    y: [0, 1.0, 1.0, 0]
                },
                Above_Mid_Level: {
                    x: [
                        55, 65, 75, 80
                    ],
                    y: [0, 1.0, 1.0, 0]
                },
                High_Level: {
                    x: [
                        75, 85, 100
                    ],
                    y: [0, 1.0, 1.0]
                }
            },
            Attentiveness: {
                Low_Level: {
                    x: [
                        0, 20, 30
                    ],
                    y: [1.0, 1.0, 0]
                },
                Below_Mid_Level: {
                    x: [
                        25, 35, 45, 48
                    ],
                    y: [0, 1.0, 1.0, 0]
                },
                Mid_Level: {
                    x: [
                        42, 50, 68, 78
                    ],
                    y: [0, 1.0, 1.0, 0]
                },
                Above_Mid_Level: {
                    x: [
                        63, 75, 85, 90
                    ],
                    y: [0, 1.0, 1.0, 0]
                },
                High_Level: {
                    x: [
                        83, 90, 100
                    ],
                    y: [0, 1.0, 1.0]
                }
            },
            Stress: {
                Low_Level: {
                    x: [
                        0, 15, 23
                    ],
                    y: [1.0, 1.0, 0]
                },
                Below_Mid_Level: {
                    x: [
                        15, 23, 33, 40
                    ],
                    y: [0, 1.0, 1.0, 0]
                },
                Mid_Level: {
                    x: [
                        35, 45, 55, 63
                    ],
                    y: [0, 1.0, 1.0, 0]
                },
                Above_Mid_Level: {
                    x: [
                        55, 65, 75, 80
                    ],
                    y: [0, 1.0, 1.0, 0]
                },
                High_Level: {
                    x: [
                        77, 85, 100
                    ],
                    y: [0, 1.0, 1.0]
                }
            },
            Result: {
                Newby: {
                    x: [
                        0, 20, 30
                    ],
                    y: [1.0, 1.0, 0]
                },
                Trainee: {
                    x: [
                        20, 30, 40, 53
                    ],
                    y: [0, 1.0, 1.0, 0]
                },
                Master: {
                    x: [
                        43, 53, 60, 73
                    ],
                    y: [0, 1.0, 1.0, 0]
                },
                Pro: {
                    x: [
                        65, 73, 80, 90
                    ],
                    y: [0, 1.0, 1.0, 0]
                },
                Expert: {
                    x: [
                        83, 90, 100
                    ],
                    y: [0, 1.0, 1.0]
                }
            }
        };
        if (fs.existsSync(process.env.MAMDANI_DIR)) {
            fs.writeFileSync(`${
                process.env.MAMDANI_DIR
            }/dots.json`, JSON.stringify(dots));
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
