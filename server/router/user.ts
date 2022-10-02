import { Router } from "express";
import SERVER from "../const/req";
import UserController from "../controllers/users";

const router = Router();

router.post(SERVER.POST_NEW_PHYS_USER, UserController.regNewPhysUser);
router.post(SERVER.USER_LOGIN, UserController.userLogin);
router.get(SERVER.GET_USER_INFO, UserController.getUserInfo);
router.patch(SERVER.UPDATE_USER_INFO, UserController.updateUserInfo);

export default router;
