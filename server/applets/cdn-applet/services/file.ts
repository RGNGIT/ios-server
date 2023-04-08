import fs from "fs";
import Hash from "./encrypt";
import Misc from "./misc";

const storage = ".\\blob\\";

class FileService {
  async writeFile(content): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if(!fs.existsSync(storage)) {
        fs.mkdirSync(storage);
      }
      const salt = Misc.escapeSlashes(await Hash.encrypt(content.name + Math.floor(Math.random() * 5928)));
      fs.writeFile(storage + salt, content.data, err => {
        if(!err) {
          resolve({salt});
        } else {
          reject(err);
        }
      });
    });
  }
  async readFile(key: string): Promise<any | Buffer> {
    return new Promise((resolve, reject) => {
      fs.readFile(storage + key, (err, data) => {
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