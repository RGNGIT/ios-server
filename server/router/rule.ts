import { Router } from "express";
import SERVER from "../const/req";
import Rules from "../controllers/rules";

const router = Router();

router.post(SERVER.POST_RULE, Rules.postRule);
router.get(SERVER.GET_RULE_LIST, Rules.getRuleList);
router.patch(SERVER.UPDATE_RULE, Rules.updateRule);
router.get(SERVER.GET_RULE_BY_KEY, Rules.ruleByKey);
router.get(SERVER.GET_TERM_DOTS, Rules.getTermDots);
router.get(SERVER.GET_TERM_LEVELS, Rules.getTermLevels);
router.post(SERVER.POST_IOS_RULE, Rules.postIosRule);
router.get(SERVER.GET_IOS_RULE_LIST, Rules.getIosRuleList);
router.patch(SERVER.UPDATE_IOS_RULE, Rules.updateIosRule);
router.get(SERVER.GET_IOS_RULE, Rules.iosRuleByKey);

export default router;
