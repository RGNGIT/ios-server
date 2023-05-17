import { Router } from "express";
import SERVER from "../const/request";
import DisciplineController from "../controllers/disciplines";

const router = Router();

router.post(SERVER.POST_NEW_DISCIPLINE, DisciplineController.addNewDiscipline);
router.get(SERVER.GET_DISCIPLINES, DisciplineController.getDisciplines);
router.post(SERVER.POST_NEW_TOPIC, DisciplineController.addNewTopic);
router.get(SERVER.GET_TOPICS, DisciplineController.getTopics);
router.post(SERVER.POST_TOPIC_MATERIAL, DisciplineController.addNewTopicMaterial);
router.post(SERVER.CONNECT_DISCIPLINE_USER, DisciplineController.connectUserWithDiscipline);
router.get(SERVER.GET_MY_DISCIPLINES, DisciplineController.getMyDisciplines);
router.get(SERVER.GET_DIFFICULTY_LIST, DisciplineController.getDifficultyList);
router.patch(SERVER.PATCH_TOPIC_MATERIAL, DisciplineController.patchTopicMaterial);
router.patch(SERVER.PATCH_DISCIPLINE, DisciplineController.editDiscipline);
router.get(SERVER.GET_DISCIPLINE_RESULTS, DisciplineController.getDisciplineTestResults);
router.get(SERVER.GET_DISCIPLINE_USERS, DisciplineController.getAllDisciplineUsers);
router.delete(SERVER.DELETE_TOPIC, DisciplineController.deleteTopic);
router.post(SERVER.ADD_EDU_TIME, DisciplineController.addEduTime);
router.get(SERVER.GET_EDU_TIME, DisciplineController.getEduTime);

export default router;