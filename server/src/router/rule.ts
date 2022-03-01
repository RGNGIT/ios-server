import {Router} from "express";
import SERVER from '../const/req';
import Rules from '../controllers/rules';

const router = Router();

router.post(SERVER.POST_RULE, Rules.postRule);
router.get(SERVER.GET_RULE_LIST, Rules.getRuleList);
router.patch(SERVER.UPDATE_RULE, Rules.updateRule);

export default router;
