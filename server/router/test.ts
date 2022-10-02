import { Router } from "express";
import SERVER from "../const/req";
import Tests from "../controllers/tests";

const router = Router();

router.get(SERVER.GET_TOPIC_LIST, Tests.getTopicList);
router.post(SERVER.SUBMIT_QUESTION, Tests.submitQuestion);
router.get(SERVER.GET_DIFF_LIST, Tests.getDifficultyList);
router.post(SERVER.SUBMIT_TEST, Tests.submitTest);
router.get(SERVER.GET_TEST_BY_KEY, Tests.getTest);
router.get(SERVER.ANSWER_VALIDATE, Tests.answerValidator);

export default router;
