import { Router } from "express";
import Content from "./controllers/content";
import SERVER from "./const/constants";

const router = Router();

router.post(SERVER.WRITE_FILE, Content.uploadFile);
router.get(SERVER.READ_FILE, Content.getFile);
router.get("/trigger", Content.trigger);

export default router;