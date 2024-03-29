import MySQL2Commander from "../mysqlCommander";

class PhysService {
  async registerLogin(key) {
    let res = await (new MySQL2Commander).queryExec(`INSERT INTO login (Phys_Key, Login_Time, Logout_Time) VALUES (${key}, NOW(), NOW() + INTERVAL 1 DAY);`);
    return await this.getLastRecord(
      await (new MySQL2Commander).queryExec(`SELECT * FROM login;`)
    );
  }
  async fetchRoleByKey(key) {
    let res = await (new MySQL2Commander).queryExec(
      `SELECT * FROM role WHERE role.Key = ${key};`
    );
    return res[0];
  }
  async getLastRecord(array) {
    return array[array.length - 1];
  }
  async addReg(unit: { Reg_Date; Phys_Key; Login; Password }) {
    let res =
      await (new MySQL2Commander).queryExec(`INSERT INTO reg (Reg_Date, Phys_Key, Login, Password) 
            VALUES ('${unit.Reg_Date}', ${unit.Phys_Key}, '${unit.Login}', '${unit.Password}');`);
    return await this.getLastRecord(
      await (new MySQL2Commander).queryExec(`SELECT * FROM reg;`)
    );
  }
  async addPhys(unit: {
    Name;
    Surname;
    Patronymic;
    Email;
    Sex_Key;
    Interface_Type;
    Rating;
    Role_Key;
  }) {
    let res =
      await (new MySQL2Commander).queryExec(`INSERT INTO phys (Name, Surname, Patronymic, Email, Sex_Key, Interface_Type, Rating, Role_Key) 
        VALUES ('${unit.Name}', '${unit.Surname}', '${unit.Patronymic}', '${unit.Email}', ${unit.Sex_Key}, '${unit.Interface_Type}', '${unit.Rating}', ${unit.Role_Key});`);
    return await this.getLastRecord(
      await (new MySQL2Commander).queryExec(`SELECT * FROM phys;`)
    );
  }
  async updateReg(
    physKey,
    unit: {
      Login;
      Password;
    }
  ) {
    let res = await (new MySQL2Commander).queryExec(`UPDATE reg SET 
            Login = '${unit.Login}', Password = '${unit.Password}' WHERE reg.Phys_Key = ${physKey};`);
  }
  async updatePhys(
    key,
    unit: {
      Name;
      Surname;
      Patronymic;
      Email;
      Sex_Key;
      Interface_Type;
      Rating;
    }
  ) {
    let res = await (new MySQL2Commander).queryExec(
      `UPDATE phys SET Name = '${unit.Name}', Surname = '${unit.Surname}', Patronymic = '${unit.Patronymic}', Email = '${unit.Email}', Sex_Key = '${unit.Sex_Key}', Interface_Type = '${unit.Interface_Type}', Rating = '${unit.Rating}' WHERE phys.Key = ${key};`
    );
  }
  async deleteOne(key) {
    let res = await (new MySQL2Commander).queryExec(
      `DELETE FROM phys WHERE phys.Key = ${key};`
    );
  }
  async fetchPhysKey(email) {
    let res = await (new MySQL2Commander).queryExec(
      `SELECT * FROM phys WHERE Email = '${email}'`
    );
    return res[0] ? res[0].Key : null;
  }
  async fetchOne(key) {
    let res1 = await (new MySQL2Commander).queryExec(
      `SELECT * FROM phys WHERE phys.Key = ${key};`
    );
    let res2 = await (new MySQL2Commander).queryExec(
      `SELECT * FROM reg WHERE reg.Phys_Key = ${res1[0].Key};`
    );
    return { reg: res2[0], phys: res1[0] };
  }
  async fetchAll() {
    let res = await (new MySQL2Commander).queryExec(`
    SELECT
    phys.Key, phys.Name, phys.Surname, phys.Patronymic, phys.Email, reg.Login, reg.Reg_Date, role.Key as Role_Key, role.Name as Role_Name 
    FROM phys JOIN reg ON reg.Phys_Key = phys.Key JOIN role ON phys.Role_Key = role.Key;`);
    return res;
  }
  async writeStatus(block: { Perseverance, Self_Development, Attentiveness, Responsibility, Stress, Discipline, Result, Status, Phys_Key, Discip_Key }) {
    await (new MySQL2Commander).queryExec(`INSERT INTO status (${Object.keys(block).join(', ')}, DateGot) VALUES (${Object.values(block).join(', ')}, NOW());`);
  }
  async writeStatusIos(block: {Test_Difficulty, Answer_Time, Correct_Percentage, Topic_Time_Key, Result, Status, Phys_Key, Discip_Key}) {
    await (new MySQL2Commander).queryExec(`INSERT INTO ios_status (${Object.keys(block).join(", ")}, DateGot) VALUES (${Object.values(block).join(", ")}, NOW());`);
  }
  async fetchAllRoles() {
    const res = await (new MySQL2Commander).queryExec(`SELECT * FROM role;`);
    return res;
  }
}

export default new PhysService();
