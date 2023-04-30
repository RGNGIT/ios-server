import { Router } from "express";
import SERVER from "../const/request";
import Tests from "../controllers/tests";

const router = Router();

router.get(SERVER.GET_TOPIC_LIST, Tests.getTopicList);
router.post(SERVER.SUBMIT_QUESTION, Tests.submitQuestion);
router.get(SERVER.GET_DIFF_LIST, Tests.getDifficultyList);
router.post(SERVER.SUBMIT_TEST, Tests.submitTest);
router.get(SERVER.GET_TEST_BY_KEY, Tests.getTest);
router.get(SERVER.ANSWER_VALIDATE, Tests.answerValidator);
router.get(SERVER.GET_TEST_LIST, Tests.getTestList);
router.delete(SERVER.DELETE_ANSWERS, Tests.deleteAnswers);
router.patch(SERVER.TEST_EDIT, Tests.editTest);
router.delete(SERVER.DELETE_TEST, Tests.deleteTest);
router.delete(SERVER.DELETE_QUESTION, Tests.deleteQuestion);
router.post(SERVER.SUBMIT_RESULT, Tests.submitTestResult);
router.get(SERVER.GET_TEST_RESULTS, Tests.getTestResults);
router.get(SERVER.GET_COMPLETE_DISCIPLINES, Tests.getCompleteDisciplines);

export default router;
