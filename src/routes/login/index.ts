// src/routes/authRoutes.ts

import express from "express";
import loginController from "../../controllers/loginController";

const router = express.Router();

// 密码登录
router.post("/password", loginController.loginPassword);
// 获取登录验证码
router.get("/send/code", loginController.sendLoginCode);
// 验证码登录
router.post("/code", loginController.loginCode);
// 注册账号
router.post("register", loginController.register);

export default router;
