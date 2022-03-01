import {Router} from "express";
import SERVER from '../const/req';
import UserController from '../controllers/users';

const router = Router();

router.use(SERVER.POST_NEW_PHYS_USER, UserController.regNewPhysUser);
router.use(SERVER.USER_LOGIN, UserController.userLogin);

export default router;
