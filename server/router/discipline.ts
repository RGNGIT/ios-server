import { Router } from "express";
import SERVER from "../const/req";
import Disciplines from "../controllers/disciplines";

const router = Router();

router.post(SERVER.POST_NEW_DISCIPLINE, Disciplines.addNewDiscipline);
router.get(SERVER.GET_DISCIPLINES, Disciplines.getDisciplines);
router.post(SERVER.POST_NEW_TOPIC, Disciplines.addNewTopic);
router.get(SERVER.GET_TOPICS, Disciplines.getTopics);
router.post(SERVER.POST_TOPIC_MATERIAL, Disciplines.addNewTopicMaterial);
router.post(SERVER.CONNECT_DISCIPLINE_USER, Disciplines.connectUserWithDiscipline);
router.get(SERVER.GET_MY_DISCIPLINES, Disciplines.getMyDisciplines);
router.get(SERVER.GET_DIFFICULTY_LIST, Disciplines.getDifficultyList);
router.patch(SERVER.PATCH_TOPIC_MATERIAL, Disciplines.patchTopicMaterial);
router.patch(SERVER.PATCH_DISCIPLINE, Disciplines.editDiscipline);
router.get(SERVER.GET_DISCIPLINE_RESULTS, Disciplines.getDisciplineTestResults);
router.get(SERVER.GET_DISCIPLINE_USERS, Disciplines.getAllDisciplineUsers);
router.delete(SERVER.DELETE_TOPIC, Disciplines.deleteTopic);
router.post(SERVER.ADD_EDU_TIME, Disciplines.addEduTime);

export default router;