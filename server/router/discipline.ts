import { Router } from "express";
import SERVER from "../const/req";
import Disciplines from "../controllers/disciplines";

const router = Router();

router.post(SERVER.POST_NEW_DISCIPLINE, Disciplines.addNewDiscipline);
router.get(SERVER.GET_DISCIPLINES, Disciplines.getDisciplines);
router.post(SERVER.POST_NEW_TOPIC, Disciplines.addNewTopic);
router.get(SERVER.GET_TOPICS, Disciplines.getTopics);
router.post(SERVER.POST_TOPIC_MATERIAL, Disciplines.addNewTopicMaterial);

export default router;