// src/routes/authRoutes.ts

import express from "express";
import authController from "../../controllers/loginController";

const router = express.Router();

router.post("/login", authController.login);

export default router;
