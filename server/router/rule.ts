import { Router } from "express";
import SERVER from "../const/req";
import Rules from "../controllers/rules";

const router = Router();

router.post(SERVER.POST_RULE, Rules.postRule);
router.get(SERVER.GET_RULE_LIST, Rules.getRuleList);
router.patch(SERVER.UPDATE_RULE, Rules.updateRule);
router.get(SERVER.GET_RULE_BY_KEY, Rules.ruleByKey);
router.get(SERVER.GET_TERM_DOTS, Rules.getTermDots);

export default router;
