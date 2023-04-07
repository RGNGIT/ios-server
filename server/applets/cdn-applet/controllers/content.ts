import { Request, Response } from "express";
import FileService from "../services/file";

class ContentController {
  async getFile(req: Request, res: Response): Promise<void> {
    try {
      const { key } = req.params;
      const fs = new FileService();
      const base64buffer = (await fs.readFile(key)).toString();
      res.json(base64buffer);
    } catch (err) {
      res.send(err);
    }
  }
  async uploadFile(req: Request, res: Response): Promise<void> {
    try {
      const { name, readable } = req.body;
      const fs = new FileService();
      var buffer = [];
      readable.on('data', (chunk) => {
        buffer.push(chunk);
      });
      readable.on('end', () => {
        console.log(buffer);
      });
      // res.json(await fs.writeFile(name, base64buffer));
    } catch (err) {
      res.send(err);
    }
  }
}

export default new ContentController();