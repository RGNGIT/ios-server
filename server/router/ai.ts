import { Router } from "express";
import SERVER from "../const/req";
import FuzzyAIController from "../controllers/ios-ai";

const router = Router();

router.get(SERVER.GET_FUZZY_RESULT, FuzzyAIController.getJsonReport);
router.get(SERVER.GET_FUZZY_STATUS, FuzzyAIController.getStudentStatus);
router.get(SERVER.GET_STORED_STATUS, FuzzyAIController.getStoredStatus);

export default router;
