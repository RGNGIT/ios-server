import fs from "fs";
import Hash from "./encrypt";
import Misc from "./misc";
import FtpService from "../services/ftp";
import CONST from "../const/constants";
import MiscMain from "../../../services/misc";

class FileService {
  constructor() {
    if (!fs.existsSync(CONST.STORAGE)) {
      fs.mkdirSync(CONST.STORAGE);
    }
  }
  async writeFile(content): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const salt = Misc.escapeSlashes(
          await Hash.encrypt(content.name + Math.floor(Math.random() * 5928))
        );
        fs.writeFile(CONST.STORAGE + "/" + salt, content.data, async (err) => {
          if (!err) {
            await new FtpService().upload(salt);
            resolve({ salt });
          } else {
            reject(err);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  async readFile(key: string): Promise<any | Buffer> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!fs.existsSync(CONST.STORAGE + "/" + key)) {
          await MiscMain.logger(
            `Не нашел файлика (${key}) в локальном кэше. Подгружаю с сервера...`,
            true
          );
          await new FtpService().read(key);
        }
        fs.readFile(CONST.STORAGE + "/" + key, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  async clearStorage() {
    return new Promise((resolve, reject) => {
      fs.rm(CONST.STORAGE, { recursive: true, force: true }, async (err) => {
        if (err) reject(err);
        await MiscMain.logger(`Локальный кэш был очищен!`, true);
        resolve("OK");
      });
    });
  }
}

export default FileService;
