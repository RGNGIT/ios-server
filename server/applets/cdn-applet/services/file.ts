import fs from "fs";
import Hash from "./encrypt";
import Misc from "./misc";
import FtpService from "../services/ftp";
import CONST from "../const/constants";

class FileService {
  constructor() {
    if(!fs.existsSync(CONST.STORAGE)) {
      fs.mkdirSync(CONST.STORAGE);
    }
  }
  async writeFile(content): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const salt = Misc.escapeSlashes(await Hash.encrypt(content.name + Math.floor(Math.random() * 5928)));
      fs.writeFile(CONST.STORAGE + '/' + salt, content.data, async err => {
        if(!err) {
          await (new FtpService).upload(salt);
          resolve({salt});
        } else {
          reject(err);
        }
      });
    });
  }
  async readFile(key: string): Promise<any | Buffer> {
    return new Promise(async (resolve, reject) => {
      if(!fs.existsSync(CONST.STORAGE + '/' + key)) {
        await (new FtpService).refreshCache();
      }
      fs.readFile(CONST.STORAGE + '/' + key, (err, data) => {
        if(err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

export default FileService;