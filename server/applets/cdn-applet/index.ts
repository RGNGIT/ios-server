import { Router } from "express";
import Content from "./controllers/content";
import SERVER from "./const/req";

const router = Router();

router.post(SERVER.WRITE_FILE, Content.uploadFile);
router.get(SERVER.READ_FILE, Content.getFile);

export default router;