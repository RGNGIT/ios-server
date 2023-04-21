import FtpClient from 'ftp-client';
import CONST from '../const/constants';

require('dotenv').config();

class FtpService {
  private config = {
    host: process.env.DB_HOST,
    port: 21,
    user: 'testuser',
    password: '12345678'
  };
  private options = {
    logging: 'none'
  };
  private client = new FtpClient(this.config, this.options);
  public async upload(key) {
    return new Promise((resolve, reject) => {
      this.client.connect(() => {
        this.client.upload([`${CONST.STORAGE}/${key}`], '/files/ios', {
          baseDir: CONST.STORAGE,
          overwrite: 'older'
        }, (result) => {
          resolve(result);
        });
      })
    });
  }
  public async refreshCache() {
    return new Promise((resolve, reject) => {
      this.client.connect(() => {
        this.client.download(`/files/ios`, `${CONST.STORAGE}/`, {
          overwrite: 'all'
        }, (result) => {
          resolve(result);
        });
      });
    });
  }
}

export default FtpService;