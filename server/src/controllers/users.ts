import PhysService from '../services/phys';
import EncryptService from '../services/encrypt';
import AuthService from '../services/auth';
import Misc from '../services/misc';
import MySQL2Commander from '../mysqlCommander';
import {Request, Response} from 'express';
import Error from '../const/err';

const jwt = require('jsonwebtoken');

class UserService {
    async regNewPhysUser(req : Request, res : Response) {
        try {
            let res1 = await PhysService.addPhys({
                Name: req.body.Name,
                Surname: req.body.Surname,
                Patronymic: req.body.Patronymic,
                Email: req.body.Email,
                Sex_Key: req.body.Sex_Key,
                Interface_Type: req.body.Interface_Type,
                Rating: req.body.Rating
            });
            let res2 = await PhysService.addReg({
                Reg_Date: req.body.Reg_Date,
                Phys_Key: res1.Key,
                Login: req.body.Login,
                Password: await EncryptService.encrypt(req.body.Password)
            });
            let User = {
                UserKey: res1.Key,
                Verify: res2.Password
            };
            res.json({
                UserData: User,
                Token: await AuthService.generateUserToken(User)
            });
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await Error.send("POST_NEW_PHYS_USER", err));
        }
    }
    async userLogin(req : Request, res : Response) {
        try {
            let res1 = await PhysService.fetchOne(await PhysService.fetchKey(req.body.Email));
            if(await AuthService.checkUserPassword({pass1:await EncryptService.encrypt(req.body.Password), pass2: res1.reg.Password})) {
                let User = {
                    UserKey: res1.phys.Key,
                    Verify: res1.reg.Password
                };
                res.json({
                    UserData: User,
                    Token: await AuthService.generateUserToken(User)
                });
            } else {
                await Misc.logger("Кто-то залогинился, но неверными данными!", false);
                res.json(await Error.send("WRONG_LOGIN_DATA", "Wrong login/password"));
            }
        } catch(err) {
            await Misc.logger(err, false);
            res.json(await Error.send("USER_LOGIN", err));
        }
    }
}

export default new UserService();
