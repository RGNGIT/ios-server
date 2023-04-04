import Misc from "../services/misc";
import { Request, Response } from "express";
import ResultHandler from "../const/respond";
import DisciplineService from "../services/discipline";

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
        }>("ERROR", await ResultHandler.buildError("ADD_TOPIC", err))
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
        }>("ERROR", await ResultHandler.buildError("FETCH_TOPICS", err))
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
      const { fileKey, diffLevelKey, topicKey, testKey } = req.body;
      await DisciplineService.addNewTopicMaterial(fileKey, diffLevelKey, topicKey, testKey);
      res.send("OK");
    } catch (err) {
      await Misc.logger(err, false);
      res.json(
        await ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: object;
        }>("ERROR", await ResultHandler.buildError("ADD_TOPIC_MATERIAL", err))
      );
    }
  }
  async connectUserWithDiscipline(req: Request, res: Response): Promise<void> {
    try {
      const { phys_key, discipline_key } = req.body;
      await DisciplineService.connectUserDiscipline(phys_key, discipline_key);
      res.send("OK");
    } catch (err) {
      await Misc.logger(err, false);
      res.json(
        await ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: object;
        }>("ERROR", await ResultHandler.buildError("CONNECT_USER_DISCIPLINE", err))
      );
    }
  }
  async getMyDisciplines(req: Request, res: Response): Promise<void> {
    try {
      const { userkey } = req.headers;
      const result = await DisciplineService.fetchDiscpilinesOfUser(userkey);
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
        }>("ERROR", await ResultHandler.buildError("GET_MY_DISCIPLINES", err))
      );
    }
  }
}


export default new Disciplines();