import { Router } from "express";
import SERVER from "../const/req";
import UserController from "../controllers/users";

const router = Router();

router.post(SERVER.POST_NEW_PHYS_USER, UserController.regNewPhysUser);
router.post(SERVER.USER_LOGIN, UserController.userLogin);
router.get(SERVER.GET_USER_INFO, UserController.getUserInfo);
router.patch(SERVER.UPDATE_USER_INFO, UserController.updateUserInfo);
router.post(SERVER.REFRESH_SESSION, UserController.refreshSession);
router.get(SERVER.GET_ALL_USERS, UserController.getAllUsers);
router.get(SERVER.GET_ALL_ROLES, UserController.getRoles);

export default router;
