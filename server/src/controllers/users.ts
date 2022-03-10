import PhysService from '../services/phys';
import EncryptService from '../services/encrypt';
import AuthService from '../services/auth';
import Misc from '../services/misc';
import {Request, Response} from 'express';
import Error from '../const/err';

class UserController {
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
                Reg_Date: await Misc.getDateTime(),
                Phys_Key: res1.Key,
                Login: req.body.Login,
                Password: await EncryptService.encrypt(req.body.Password)
            });
            let User = {
                UserKey: res1.Key,
                Verify: res2.Password
            };
            res.json({UserData: User, Token: await AuthService.generateUserToken(User)});
            await Misc.logger("Метод POST_NEW_PHYS_USER успешно прогнан!", false);
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await Error.send("POST_NEW_PHYS_USER", err));
        }
    }
    async userLogin(req : Request, res : Response) {
        try {
            let res1 = await PhysService.fetchOne(await PhysService.fetchPhysKey(req.body.Email));
            if (await AuthService.checkUserPassword({
                pass1: await EncryptService.encrypt(req.body.Password),
                pass2: res1.reg.Password
            })) {
                let User = {
                    UserKey: res1.phys.Key,
                    Verify: res1.reg.Password
                };
                res.json({UserData: User, Token: await AuthService.generateUserToken(User)});
                await Misc.logger("Метод USER_LOGIN успешно прогнан!", false);
            } else {
                await Misc.logger("Кто-то залогинился, но неверными данными!", false);
                res.json(await Error.send("WRONG_LOGIN_DATA", "Wrong login/password"));
            }
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await Error.send("USER_LOGIN", err));
        }
    }
    async getUserInfo(req : Request, res : Response) {
        try {
            res.json(await PhysService.fetchOne(req.params.id));
            await Misc.logger("Метод GET_USER_INFO успешно прогнан!", false);
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await Error.send("GET_USER_INFO", err));
        }
    }
    async updateUserInfo(req : Request, res : Response) {
        try {
            await PhysService.updatePhys(req.body.Key, {
                Name: req.body.Name,
                Surname: req.body.Surname,
                Patronymic: req.body.Patronymic,
                Email: req.body.Email,
                Sex_Key: req.body.Sex_Key,
                Interface_Type: req.body.Interface_Type,
                Rating: req.body.Rating
            });
            await PhysService.updateReg(req.body.Key, {
                Login: req.body.Login,
                Password: await EncryptService.encrypt(req.body.Password)
            })
            res.status(200);
            await Misc.logger("Метод UPDATE_USER_INFO успешно прогнан!", false);
        } catch (err) {
            await Misc.logger(err, false);
            res.json(await Error.send("UPDATE_USER_INFO", err));
        }
    }
}

export default new UserController();
