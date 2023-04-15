import Misc from "../services/misc";
import { Request, Response } from "express";
import ResultHandler from "../const/respond";
import DisciplineService from "../services/discipline";
import TestService from "../services/test";

class Disciplines {
  async addNewDiscipline(req: Request, res: Response): Promise<void> {
    try {
      const { Name, ShName } = req.body;
      const newDiscipline = await DisciplineService.addNew(Name, ShName);
      await DisciplineService.connectUserDiscipline(req.headers.userkey, newDiscipline.insertId);
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
  async editDiscipline(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, shName } = req.body;
      await DisciplineService.patchDiscipline(id, { Name: name, ShName: shName });
      res.send("OK");
    } catch (err) {
      await Misc.logger(err, false);
      res.json(
        await ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: object;
        }>("ERROR", await ResultHandler.buildError("PATCH_DISCIPLINE", err))
      );
    }
  }
  async getDifficultyList(req: Request, res: Response): Promise<void> {
    try {
      const result = await DisciplineService.fetchDifficultyList();
      res.json(
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
        }>("ERROR", await ResultHandler.buildError("GET_DIFFICULTY_LIST", err))
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
  async patchTopicMaterial(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { fileKey, testKey } = req.body;
      await DisciplineService.patchTopicMaterial(id, { File_Link: fileKey, Test_Key: testKey });
      res.send("OK");
    } catch (err) {
      await Misc.logger(err, false);
      res.json(
        await ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: object;
        }>("ERROR", await ResultHandler.buildError("PATCH_TOPIC_MATERIAL", err))
      );
    }
  }
  async getTopics(req: Request, res: Response): Promise<void> {
    try {
      const { discipline, difficulty, raw } = req.query;
      let result;
      if (!discipline) {
        result = await DisciplineService.fetchAllTopics();
      } else {
        result = await DisciplineService.fetchTopicsByDiscipline(discipline, difficulty);
      }
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
  // NEEDED?
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
  async getDisciplineTestResults(req: Request, res: Response): Promise<void> {
    try {
      const {id} = req.params;
      const result = await TestService.fetchTestResultsOfDiscipline(id);
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
        }>("ERROR", await ResultHandler.buildError("GET_DISCIPLINE_RESULTS", err))
      );
    }
  }
}


export default new Disciplines();