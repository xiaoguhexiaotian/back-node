// src/controllers/authController.ts

import { Request, Response } from "express";

const authController = {
  login: (req: Request, res: Response) => {
    const { username, password } = req.body;

    console.log(req, 1111111);
    // 在这里编写登录逻辑，验证用户名和密码

    if (username === "admin" && password === "123456") {
      // 登录成功
      return res.status(200).json({ message: "登录成功" });
    } else {
      // 登录失败
      return res.status(401).json({ message: "登录失败" });
    }
  },
};

export default authController;
