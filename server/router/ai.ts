import { Router } from "express";
import SERVER from "../const/req";
import FuzzyAIController from "../controllers/ios-ai";

const router = Router();

router.get(SERVER.GET_FUZZY_RESULT, FuzzyAIController.getJsonReport);
router.get(SERVER.GET_FUZZY_STATUS, FuzzyAIController.getStudentStatus);

export default router;
