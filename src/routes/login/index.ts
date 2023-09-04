// src/routes/authRoutes.ts

import express from "express";
import loginController from "../../controllers/loginController";

const router = express.Router();

// 密码登录
router.post("/password", loginController.loginPassword);
// 获取登录验证码
router.get("/get/code", loginController.sendLoginCode);
// 验证码登录
router.post("/code", loginController.loginCode);
// 注册账号
router.post("/register", loginController.register);
// 用户列表查询
router.get("/userList", loginController.userList);
// 删除用户
router.post("/delUser", loginController.delUser);

export default router;
