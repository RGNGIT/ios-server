import PhysService from "../services/phys";
import EncryptService from "../services/encrypt";
import AuthService from "../services/auth";
import Misc from "../services/misc";
import { Request, Response } from "express";
import ResultHandler from "../const/response";
import { checkSession, pushSession } from "../const/session-storage";

class UserController {
  async regNewPhysUser(req: Request, res: Response): Promise<void> {
    try {
      const fetchedUser = await PhysService.fetchPhysKey(req.body.Email);
      if (fetchedUser) {
        res.json(
          await ResultHandler.result<{
            Code: number;
            Error: string;
            AdditionalInfo: object;
          }>("ERROR", await ResultHandler.buildError("POST_NEW_PHYS_USER", "Юзер c таким мылом существует"))
        );
        return;
      }
      let res1 = await PhysService.addPhys({
        Name: req.body.Name,
        Surname: req.body.Surname,
        Patronymic: req.body.Patronymic,
        Email: req.body.Email,
        Sex_Key: req.body.Sex_Key,
        Age: req.body.Age,
        Interface_Type: req.body.Interface_Type,
        Rating: req.body.Rating,
        Role_Key: req.body.Role_Key
      });
      let res2 = await PhysService.addReg({
        Reg_Date: await Misc.getDateTime(),
        Phys_Key: res1.Key,
        Login: req.body.Login,
        Password: await EncryptService.encrypt(req.body.Password),
      });
      let User = {
        UserKey: res1.Key,
        Email: req.body.Email,
        Verify: res2.Password,
        Role: await PhysService.fetchRoleByKey(res1.Role_Key)
      };
      const tokenSet = await AuthService.generateUserTokens(User);
      const user = {
        UserData: User,
        Token: tokenSet.token,
      };
      await pushSession(user);
      res.cookie('refreshToken', tokenSet.refreshToken, { httpOnly: true });
      res.json(
        await ResultHandler.result<{
          UserData: {
            UserKey: number;
            Email: string;
            Verify: string;
            Role: any;
          };
          Token: string;
          TTL?: Date;
        }>("OK", user)
      );
      await Misc.logger("Метод POST_NEW_PHYS_USER успешно прогнан!", false);
    } catch (err) {
      await Misc.logger(err, false);
      res.json(
        await ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: object;
        }>("ERROR", await ResultHandler.buildError("POST_NEW_PHYS_USER", err))
      );
    }
  }
  /*
      _,-======._                  
      ,:'XXXXXXXXXXX\                 
     .XXXXXXXXXXXXXXXX                
     /XXXXXXXXXXXXXXXX.               
     \X/ \X\`X\XX==XXX\               
     `X --`\  -- XX@.XX               
     ' X`-.   ,-'XXyXXX               
       X\  `__,  XX\XXX               
       |X`.   _-'XXxXXX\              
        X/'`'`  .XXxXXXX              
       .X/-,` -' XX-`XXX\             
      /XX.,/\/| .XX  `"""\            
     | /: ' ` -"XXX      |            
     |/` /   .`.XXX\  ,  /X           
    ,'|  |  ,  X XXX\/   |`X          
    ' `. |  /  /`'\XX\  .X\ X         
    \  ` \ .  /    \X\  /XX  `,       
     `=:\ \/.'=___-`X/ /XXX\  xx      
     /|  `'/`       /  |XXXX`, xx     
    //\   Y        ,  /x\XXXXX~.x     
   / X/, *|        |  |xx`\,XX\`+.    
  | /Xx`  `.        \.|xxxxx\-XX\ `,  
  | XXxx\ *\          \,xxxxxxxx-\ `. 
  \XXxxx|   .           \xxxxxxxx,\ ' 
 .XXxxxx|  *|         ,' `.xxxx\xx\\  
/Xxxxxxx| ,'`.       /     \x/x xx|\\ 
/(/xxx\xx_/    \     /      \/ / \
*/
  async userLogin(req: Request, res: Response): Promise<void> {
    try {
      const fetchedSessionUser = checkSession(req.body.Email);
      if (fetchedSessionUser) {
        res.json(await ResultHandler.result<{
          UserData: {
            UserKey: number;
            Email: string;
            Verify: string;
            Role: any
          };
          Token: string;
          TTL?: Date;
        }>("OK", fetchedSessionUser)
        );
        return;
      }
      let res1 = await PhysService.fetchOne(
        await PhysService.fetchPhysKey(req.body.Email)
      );
      if (
        await AuthService.checkUserPassword({
          pass1: await EncryptService.encrypt(req.body.Password),
          pass2: res1.reg.Password,
        })
      ) {
        let User = {
          UserKey: res1.phys.Key,
          Email: req.body.Email,
          Verify: res1.reg.Password,
          Role: await PhysService.fetchRoleByKey(res1.phys.Role_Key)
        };
        const tokenSet = await AuthService.generateUserTokens(User);
        const user = {
          UserData: User,
          Token: tokenSet.token,
        };
        await pushSession(user);
        res.cookie('refreshToken', tokenSet.refreshToken, { httpOnly: true });
        res.json(
          await ResultHandler.result<{
            UserData: {
              UserKey: number;
              Email: string;
              Verify: string;
              Role: any
            };
            Token: string;
            TTL?: Date;
          }>("OK", user)
        );
        await Misc.logger("Метод USER_LOGIN успешно прогнан!", false);
      } else {
        await Misc.logger("Кто-то залогинился, но неверными данными!", false);
        res.json(
          await ResultHandler.result<{
            Code: number;
            Error: string;
            AdditionalInfo: any;
          }>(
            "ERROR",
            await ResultHandler.buildError(
              "WRONG_LOGIN_DATA",
              "Wrong login/password"
            )
          )
        );
      }
    } catch (err) {
      await Misc.logger(err, false);
      res.json(
        await ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: any;
        }>("ERROR", await ResultHandler.buildError("USER_LOGIN", err))
      );
    }
  }
  async refreshSession(req: Request, res: Response): Promise<void> {
    try {
      if (req.cookies?.refreshToken) {
        const rt = req.cookies.refreshToken;
        const user = await AuthService.verifyRefreshToken(rt);
        if (user) {
          user.Verify += Math.floor(Math.random() * 11111111);
          const tokenSet = await AuthService.generateUserTokens(user);
          res.cookie('refreshToken', tokenSet.refreshToken, { httpOnly: true });
          res.json(
            await ResultHandler.result<{ token: string; }>("OK", { token: tokenSet.token })
          );
        } else {
          res.json(
            await ResultHandler.result<{
              Code: number;
              Error: string;
              AdditionalInfo: any;
            }>(
              "ERROR",
              await ResultHandler.buildError(
                "REFRESH_TOKEN_SHIT",
                "Чет не то c рефреш токеном"
              )
            )
          );
        }
      } else {
        res.json(
          await ResultHandler.result<{
            Code: number;
            Error: string;
            AdditionalInfo: any;
          }>(
            "ERROR",
            await ResultHandler.buildError(
              "REFRESH_TOKEN_SHIT",
              "Чет не то c рефреш токеном"
            )
          )
        );
      }
    } catch (err) {
      await Misc.logger(err, false);
      res.json(
        await ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: any;
        }>("ERROR", await ResultHandler.buildError("REFRESH_SESSION", err))
      );
    }
  }
  async getUserInfo(req: Request, res: Response): Promise<void> {
    try {
      const res1 = await PhysService.fetchOne(req.params.id);
      const role = await PhysService.fetchRoleByKey(res1.phys.Role_Key);
      res1.phys.Role = role;
      res.json(
        await ResultHandler.result<{
          reg: {
            Reg_Date: string;
            Phys_Key: number;
            Login: string;
            Password: string;
          };
          phys: {
            Key: number;
            Name: string;
            Surname: string;
            Patronymic: string;
            Email: string;
            Sex_Key: number;
            Interface_Type: number;
            Rating: string;
          };
        }>("OK", res1)
      );
      await Misc.logger("Метод GET_USER_INFO успешно прогнан!", false);
    } catch (err) {
      await Misc.logger(err, false);
      res.json(
        await ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: object;
        }>("ERROR", await ResultHandler.buildError("GET_USER_INFO", err))
      );
    }
  }
  async updateUserInfo(req: Request, res: Response): Promise<void> {
    try {
      await PhysService.updatePhys(req.body.Key, {
        Name: req.body.Name,
        Surname: req.body.Surname,
        Patronymic: req.body.Patronymic,
        Email: req.body.Email,
        Sex_Key: req.body.Sex_Key,
        Interface_Type: req.body.Interface_Type,
        Rating: req.body.Rating,
      });
      await PhysService.updateReg(req.body.Key, {
        Login: req.body.Login,
        Password: await EncryptService.encrypt(req.body.Password),
      });
      res.json(await ResultHandler.result<void>("OK", null));
      await Misc.logger("Метод UPDATE_USER_INFO успешно прогнан!", false);
    } catch (err) {
      await Misc.logger(err, false);
      res.json(
        await ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: object;
        }>("ERROR", await ResultHandler.buildError("UPDATE_USER_INFO", err))
      );
    }
  }
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await PhysService.fetchAll();
      res.json(
        await ResultHandler.result<Array<{}>>("OK", users)
      );
    } catch(err) {
      await Misc.logger(err, false);
      res.json(
        await ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: object;
        }>("ERROR", await ResultHandler.buildError("GET_ALL_USERS", err))
      );
    }
  }
  async getRoles(req: Request, res: Response): Promise<void> {
    try {
      const result = await PhysService.fetchAllRoles();
      res.json(
        await ResultHandler.result<Array<{}>>("OK", result)
      );
    } catch(err) {
      await Misc.logger(err, false);
      res.json(
        await ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: object;
        }>("ERROR", await ResultHandler.buildError("GET_ALL_ROLES", err))
      );
    }
  }
}

export default new UserController();
