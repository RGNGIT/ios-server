import Misc from "../services/misc";
import { Request, Response } from "express";
import ResultHandler from "../const/respond";
import DisciplineService from "../services/discipline";
import CDNFileService from "../applets/cdn-applet/services/file";

class Disciplines {
  async addNewDiscipline(req: Request, res: Response): Promise<void> {
    try {
      const { Name, ShName } = req.body;
      await DisciplineService.addNew(Name, ShName);
      res.send("OK");
    } catch (err) {
      await Misc.logger(err, false);
      res.json(
        await ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: object;
        }>("ERROR", await ResultHandler.buildError("ADD_DISCIPLINE", err))
      );
    }
  }
  async addNewTopic(req: Request, res: Response): Promise<void> {
    try {
      const { Name, Number, Discip_Key, Topic_Weight } = req.body;
      await DisciplineService.addNewTopic(Name, Number, Discip_Key, Topic_Weight);
      res.send("OK");
    } catch (err) {
      await Misc.logger(err, false);
      res.json(
        await ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: object;
        }>("ERROR", await ResultHandler.buildError("", err))
      );
    }
  }
  async getTopics(req: Request, res: Response): Promise<void> {
    try {
      const result = await DisciplineService.fetchAllTopics();
      await Misc.logger(JSON.stringify(result), false);
      res.send(
        await ResultHandler.result<Array<{}>>(
          "OK",
          result
        )
      );
    } catch (err) {
      await Misc.logger(err, false);
      res.json(
        await ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: object;
        }>("ERROR", await ResultHandler.buildError("", err))
      );
    }
  }
  async getDisciplines(req: Request, res: Response): Promise<void> {
    try {
      const { by, id } = req.query;
      if (!id) {
        const result = await DisciplineService.fetchAll();
        await Misc.logger(JSON.stringify(result), false);
        res.send(
          await ResultHandler.result<Array<{}>>(
            "OK",
            result
          )
        );
      } else {
        let result;
        switch (by) {
          case "key":
            result = await DisciplineService.fetchOneByKey(id);
            await Misc.logger(JSON.stringify(result), false);
            res.send(
              await ResultHandler.result<Array<{}>>(
                "OK",
                result
              )
            );
            break;
          case "name":
            result = await DisciplineService.fetchOneByName(id);
            await Misc.logger(JSON.stringify(result), false);
            res.send(
              await ResultHandler.result<Array<{}>>(
                "OK",
                result
              )
            );
            break;
        }
      }
    } catch (err) {
      await Misc.logger(err, false);
      res.json(
        await ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: object;
        }>("ERROR", await ResultHandler.buildError("FETCH_DISCIPLINES", err))
      );
    }
  }
  async getTopicMaterial(req: Request, res: Response): Promise<void> {
    
  }
  async addNewTopicMaterial(req: Request, res: Response): Promise<void> {
    try {
      const { fileName, base64buffer, diffLevelKey, topicKey, testKey } = req.body;
      const fs = new CDNFileService();
      const file = await fs.writeFile(fileName, Buffer.from(base64buffer));
      await DisciplineService.addNewTopicMaterial(file.salt, diffLevelKey, topicKey, testKey);
      res.send(
        await ResultHandler.result<Array<{}>>(
          "OK",
          file
        )
      );
    } catch (err) {
      await Misc.logger(err, false);
      res.json(
        await ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: object;
        }>("ERROR", await ResultHandler.buildError("", err))
      );
    }
  }
}


export default new Disciplines();