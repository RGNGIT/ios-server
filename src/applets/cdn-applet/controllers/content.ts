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
      res.send(err);
    }
  }
  async uploadFile(req, res: Response): Promise<void> {
    try {
      const { content } = req.files;
      const fs = new FileService();
      res.json(await fs.writeFile(content));
    } catch (err) {
      res.send(err);
    }
  }
}

export default new ContentController();