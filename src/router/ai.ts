import { Router } from "express";
import SERVER from "../const/request";
import FuzzyAIController from "../controllers/ios-ai";

const router = Router();

router.get(SERVER.GET_FUZZY_RESULT, FuzzyAIController.getJsonReport);
router.get(SERVER.GET_FUZZY_STATUS, FuzzyAIController.getStudentStatusMain);
router.get(SERVER.GET_STORED_STATUS, FuzzyAIController.getStoredStatusMain);
router.get(SERVER.GET_STORED_STATUS_IOS, FuzzyAIController.getStoredStatusIos);
router.get(SERVER.GET_SYSTEM_TERM_DOTS, FuzzyAIController.getSystemTerms);
router.patch(SERVER.PATCH_TERM_DOTS, FuzzyAIController.editTermsValues);

export default router;
