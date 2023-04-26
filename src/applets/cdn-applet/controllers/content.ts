import { Request, Response } from "express";
import FileService from "../services/file";
import FtpService from "../services/ftp";
import fs from "fs";

class ContentController {
  async getFile(req: Request, res: Response): Promise<void> {
    try {
      const { key } = req.params;
      const fileService = new FileService();
      let base64buffer = (await fileService.readFile(key)).toString('base64');
      res.json(base64buffer);
    } catch (err) {
      res.json(fs.readFileSync(`${__dirname}/../const/missing.png`).toString('base64'));
    }
  }
  async uploadFile(req, res: Response): Promise<void> {
    try {
      const { content } = req.files;
      const fs = new FileService();
      res.json(await fs.writeFile(content));
    } catch (err) {
      res.json(err);
    }
  }
}

export default new ContentController();