import MySQL2Commander from '../mysqlCommander';

class PhysService {
    async getLastRecord(array) {
        return array[array.length - 1];
    }
    async addReg(unit : {
        Reg_Date,
        Phys_Key,
        Login,
        Password
    }) {
        let res = await MySQL2Commander.queryExec(`INSERT INTO reg (Reg_Date, Phys_Key, Login, Password) 
            VALUES ('${
            unit.Reg_Date
        }', ${
            unit.Phys_Key
        }, '${
            unit.Login
        }', '${
            unit.Password
        }');`);
        return await this.getLastRecord(await MySQL2Commander.queryExec(`SELECT * FROM reg;`));
    }
    async addPhys(unit : {
        Name,
        Surname,
        Patronymic,
        Email,
        Sex_Key,
        Interface_Type,
        Rating
    }) {
        let res = await MySQL2Commander.queryExec(`INSERT INTO phys (Name, Surname, Patronymic, Email, Sex_Key, Interface_Type, Rating) 
        VALUES ('${
            unit.Name
        }', '${
            unit.Surname
        }', '${
            unit.Patronymic
        }', '${
            unit.Email
        }', ${
            unit.Sex_Key
        }, '${
            unit.Interface_Type
        }', '${
            unit.Rating
        }');`);
        return await this.getLastRecord(await MySQL2Commander.queryExec(`SELECT * FROM phys;`));
    }
    async updateReg(physKey, unit : {
        Reg_Date,
        Login,
        Password
    }) {
        let res = await MySQL2Commander.queryExec(`UPDATE reg SET Reg_Date = '${
            unit.Reg_Date
        }', Login = '${
            unit.Login
        }', Password = '${
            unit.Password
        }' WHERE reg.Phys_Key = ${physKey};`);
    }
    async updatePhys(key, unit : {
        Name,
        Surname,
        Patronymic,
        Email,
        Sex_Key,
        Interface_Type,
        Rating
    }) {
        let res = await MySQL2Commander.queryExec(`UPDATE phys SET Name = '${
            unit.Name
        }', Surname = '${
            unit.Surname
        }', Patronymic = '${
            unit.Patronymic
        }', Email = '${
            unit.Email
        }', Sex_Key = '${
            unit.Sex_Key
        }', Interface_Type = '${
            unit.Interface_Type
        }', Rating = '${
            unit.Rating
        }' WHERE phys.Key = ${key};`);
    }
    async deleteOne(key) {
        let res = await MySQL2Commander.queryExec(`DELETE FROM phys WHERE phys.Key = ${key};`);
    }
    async fetchKey(email) {
        let res = await MySQL2Commander.queryExec(`SELECT * FROM phys WHERE Email = '${email}'`);
        return res[0].Key;
    }
    async fetchOne(key) {
        let res1 = await MySQL2Commander.queryExec(`SELECT * FROM phys WHERE phys.Key = ${key};`);
        let res2 = await MySQL2Commander.queryExec(`SELECT * FROM reg WHERE reg.Phys_Key = ${
            res1[0].Key
        };`);
        return {reg: res2[0], phys: res1[0]};
    }
}

export default new PhysService();
