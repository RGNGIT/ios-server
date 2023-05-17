import { Router } from "express";
import SERVER from "../const/request";
import RuleController from "../controllers/rules";

const router = Router();

router.post(SERVER.POST_RULE, RuleController.postRule);
router.get(SERVER.GET_RULE_LIST, RuleController.getRuleList);
router.patch(SERVER.UPDATE_RULE, RuleController.updateRule);
router.get(SERVER.GET_RULE_BY_KEY, RuleController.ruleByKey);
router.get(SERVER.GET_TERM_DOTS, RuleController.getTermDots);
router.get(SERVER.GET_TERM_DOTS_IOS, RuleController.getTermDotsIos);
router.get(SERVER.GET_TERM_LEVELS, RuleController.getTermLevels);
router.post(SERVER.POST_IOS_RULE, RuleController.postIosRule);
router.get(SERVER.GET_IOS_RULE_LIST, RuleController.getIosRuleList);
router.patch(SERVER.UPDATE_IOS_RULE, RuleController.updateIosRule);
router.get(SERVER.GET_IOS_RULE, RuleController.iosRuleByKey);

export default router;
