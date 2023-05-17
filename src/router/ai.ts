import { Router } from "express";
import SERVER from "../const/request";
import FuzzyController from "../controllers/ios-ai";

const router = Router();

router.get(SERVER.GET_FUZZY_RESULT, FuzzyController.getJsonReport);
router.get(SERVER.GET_FUZZY_STATUS, FuzzyController.getStudentStatusMain);
router.get(SERVER.GET_STORED_STATUS, FuzzyController.getStoredStatusMain);
router.get(SERVER.GET_STORED_STATUS_IOS, FuzzyController.getStoredStatusIos);
router.get(SERVER.GET_SYSTEM_TERM_DOTS, FuzzyController.getSystemTerms);
router.patch(SERVER.PATCH_TERM_DOTS, FuzzyController.editTermsValues);

export default router;
