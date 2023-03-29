import Misc from "../services/misc";
import { Request, Response } from "express";
import ResultHandler from "../const/respond";
import RuleService from "../services/rule";
import Storage from "../const/object-storage";

class Rules {
  async postRule(req: Request, res: Response): Promise<void> {
    try {
      await Misc.logger(
        `Какой-то бесстрашный на ${
          req.socket.remoteAddress
        } добавил правило (${JSON.stringify(req.body)}). Ну и че по итогам:`,
        true
      );
      let res1 = await RuleService.writeRule(
        await Misc.formatter(req.body.disciplineLevel),
        await Misc.formatter(req.body.selfDevelopment),
        await Misc.formatter(req.body.responsibility),
        await Misc.formatter(req.body.perseverance),
        await Misc.formatter(req.body.attentiveness),
        await Misc.formatter(req.body.stress),
        await Misc.formatter(req.body.result)
      );
      await Misc.logger(JSON.stringify(res1), false);
      res.send(
        await ResultHandler.result<string>(
          "OK",
          await Misc.logger("Метод POST_RULE успешно прогнан!", false)
        )
      );
    } catch (err) {
      await Misc.logger(err, false);
      res.json(
        await ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: object;
        }>("ERROR", await ResultHandler.buildError("POST_RULE", err))
      );
    }
  }
  async getTermDots(req: Request, res: Response): Promise<void> {
    try {
      const {name, value} = req.query;
      const result = Storage.dots[name.toString()][value.toString()];
      if(!result) {
        throw new Error("Нету терм на такой запрос :(");
      }
      res.json(
        await ResultHandler.result<{}>("OK", result)
      );
    } catch(err) {
      await Misc.logger(err, false);
      res.json(
        await ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: object;
        }>("ERROR", await ResultHandler.buildError("GET_TERM_DOTS", err))
      );
    }
  }
  async getRuleList(req: Request, res: Response): Promise<void> {
    try {
      await Misc.logger(
        `Какой-то бесстрашный на ${
          req.socket.remoteAddress
        } запросил список правил (${JSON.stringify(
          req.params
        )}). Ну и че по итогам:`,
        true
      );
      let res1 = await RuleService.fetchRules("Result");
      res.json(
        await ResultHandler.result<
          Array<{
            Key: number;
            Discipline_Level: string;
            Self_Development: string;
            Responsibility: string;
            Perseverance: string;
            Attentiveness: string;
            Stress: string;
            Result: string;
          }>
        >("OK", res1)
      );
      await Misc.logger("Метод GET_RULE_LIST успешно прогнан!", false);
    } catch (err) {
      await Misc.logger(err, false);
      res.json(
        await ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: object;
        }>("ERROR", await ResultHandler.buildError("GET_RULE_LIST", err))
      );
    }
  }
  async ruleByKey(req: Request, res: Response): Promise<void> {
    try {
      const {id} = req.params;
      const rule = await RuleService.fetchRuleByKey(id);
      if(!rule) {
        throw new Error("Нету такого правила :(");
      }
      let dots = {};
      for(const key in rule) {
        if(key == "Key") {
          continue;
        }
        dots[key] = Storage.dots[key][rule[key]];
      }
      const result = {rule, dots};
      res.json(
        await ResultHandler.result<{}>("OK", result)
      );
    } catch(err) {
      await Misc.logger(err, false);
      res.json(
        await ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: object;
        }>("ERROR", await ResultHandler.buildError("GET_RULE_BY_ID", err))
      );
    }
  }
  async updateRule(req: Request, res: Response): Promise<void> {
    try {
      await Misc.logger(
        `Какой-то бесстрашный на ${
          req.socket.remoteAddress
        } отредачил правило (${JSON.stringify(req.body)}). Ну и че по итогам:`,
        true
      );
      let res1 = await RuleService.updateRule(
        await Misc.formatter(req.body.Discipline_Level),
        await Misc.formatter(req.body.Self_Development),
        await Misc.formatter(req.body.Responsibility),
        await Misc.formatter(req.body.Perseverance),
        await Misc.formatter(req.body.Attentiveness),
        await Misc.formatter(req.body.Stress),
        await Misc.formatter(req.body.Result),
        req.params.id
      );
      await Misc.logger(JSON.stringify(res1), false);
      res.send(
        await ResultHandler.result<string>(
          "OK",
          await Misc.logger("Метод UPDATE_RULE успешно прогнан!", false)
        )
      );
    } catch (err) {
      await Misc.logger(err, false);
      res.json(
        await ResultHandler.result<{
          Code: number;
          Error: string;
          AdditionalInfo: object;
        }>("ERROR", await ResultHandler.buildError("UPDATE_RULE", err))
      );
    }
  }
}

export default new Rules();
