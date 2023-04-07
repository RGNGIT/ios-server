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
      const { name, buffer } = req.body;
      const fs = new FileService();
      // console.log(buffer);
      function toBuffer(arrayBuffer) {
        const buffer = Buffer.alloc(arrayBuffer.byteLength);
        const view = new Uint8Array(arrayBuffer);
        for (let i = 0; i < buffer.length; ++i) {
          buffer[i] = view[i];
        }
        return buffer;
      }
      const file = toBuffer(buffer);
      console.log(file);
      res.json(await fs.writeFile("zalupa.png", file));
    } catch (err) {
      res.send(err);
    }
  }
}

export default new ContentController();