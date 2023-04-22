import FtpClient from 'ftp';
import CONST from '../const/constants';
import fs from 'fs';

require('dotenv').config();

class FtpService {
  private config = {
    host: process.env.CDN_HOST,
    port: process.env.CDN_PORT,
    user: process.env.CDN_USERNAME,
    password: process.env.CDN_PASSWORD
  };
  private client = new FtpClient(this.config);
  public async upload(key) {
    return new Promise((resolve, reject) => {
      this.client.on('ready', () => {
        this.client.put(`${CONST.STORAGE}/${key}`, `files/ios/${key}`, (err) => {
          if(err) reject(err);
          resolve("OK");
          this.client.end();
        });
      });
      this.client.connect(this.config);
    });
  }
  public async read(key) {
    return new Promise((resolve, reject) => {
      this.client.on('ready', () => {
        this.client.get(`files/ios/${key}`, (err, stream) => {
          if(err) reject(err);
          stream.once('close', () => { this.client.end(); resolve("OK"); });
          stream.pipe(fs.createWriteStream(`${CONST.STORAGE}/${key}`));
        });
      });
      this.client.connect(this.config);
    });
  }
}

export default FtpService;