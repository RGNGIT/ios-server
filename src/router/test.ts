import { Router } from "express";
import SERVER from "../const/request";
import TestController from "../controllers/tests";

const router = Router();

router.get(SERVER.GET_TOPIC_LIST, TestController.getTopicList);
router.post(SERVER.SUBMIT_QUESTION, TestController.submitQuestion);
router.get(SERVER.GET_DIFF_LIST, TestController.getDifficultyList);
router.post(SERVER.SUBMIT_TEST, TestController.submitTest);
router.get(SERVER.GET_TEST_BY_KEY, TestController.getTest);
router.get(SERVER.ANSWER_VALIDATE, TestController.answerValidator);
router.get(SERVER.GET_TEST_LIST, TestController.getTestList);
router.delete(SERVER.DELETE_ANSWERS, TestController.deleteAnswers);
router.patch(SERVER.TEST_EDIT, TestController.editTest);
router.delete(SERVER.DELETE_TEST, TestController.deleteTest);
router.delete(SERVER.DELETE_QUESTION, TestController.deleteQuestion);
router.post(SERVER.SUBMIT_RESULT, TestController.submitTestResult);
router.get(SERVER.GET_TEST_RESULTS, TestController.getTestResults);
router.get(SERVER.GET_COMPLETE_DISCIPLINES, TestController.getCompleteDisciplines);

export default router;
