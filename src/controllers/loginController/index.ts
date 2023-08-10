// src/controllers/authController.ts

import { Request, Response } from "express";

const authController = {
  // 注册
  register: (req: Request, res: Response) => {
    console.log(req, res);
  },
  // 密码登录逻辑
  loginPassword: (req: Request, res: Response) => {
    const { username, password } = req.body;
    // 在这里编写登录逻辑，验证用户名和密码
    if (username === "admin" && password === "123456") {
      const returnData = {
        code: 200,
        success: true,
        message: "登录成功",
        timestamp: new Date().getTime(),
      };
      // 登录成功
      return res.status(returnData.code).json(returnData);
    } else if (username !== "admin") {
      const returnData = {
        code: 200,
        success: false,
        message: "用户名错误",
        timestamp: new Date().getTime(),
      };
      // 登录失败
      return res.status(returnData.code).json(returnData);
    } else {
      const returnData = {
        code: 200,
        success: false,
        message: "密码错误",
        timestamp: new Date().getTime(),
      };
      // 登录失败
      return res.status(returnData.code).json(returnData);
    }
  },
  // 获取验证码
  sendLoginCode: (req: Request, res: Response) => {
    console.log(req, res);
  },
  // 验证码登录逻辑
  loginCode: (req: Request, res: Response) => {
    console.log(req, res);
  },
};

export default authController;
