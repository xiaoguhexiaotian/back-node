// src/controllers/authController.ts

import { Request, Response } from "express";
import User from "../../models/user";

const jsonWebToken = require("jsonwebtoken");

const authController = {
  // 注册
  register: async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const returnData = {
      code: 200,
      timestamp: new Date().getTime(),
    };
    // 根据用户输入的账号去数据库查找,如果无该用户则向数据库写入这条数据
    try {
      const result = await User.findOne({ username });
      if (result) {
        console.log("该用户已注册");
        return res.status(200).json(
          Object.assign(returnData, {
            success: false,
            message: "该用户已注册",
          })
        );
      }
      console.log("进入新增保存");
      const newUser = new User({ username, password });
      await newUser.save();
      return res.status(200).json(
        Object.assign(returnData, {
          success: true,
          message: "注册成功",
        })
      );
    } catch (error) {
      // 用户名和密码必填校验暂时由前端校验拦截
      console.error("注册失败:", error);
      return res.status(500).json(
        Object.assign(returnData, {
          code: 500,
          success: false,
          message: "注册失败",
        })
      );
    }
  },
  // 密码登录逻辑
  loginPassword: async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const returnData = {
      code: 200,
      timestamp: new Date().getTime(),
    };
    try {
      const user = await User.findOne({ username });
      if (user) {
        if (user.password === password) {
          console.log("登录成功");
          //密钥
          const SECRET_KEY = "tianwanggaidihu";
          const token = jsonWebToken.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 10,
              userName: username,
            },
            SECRET_KEY
            // {
            //   expiresIn: 60 * 1, //token有效期 测试token验证，暂时1分钟
            // }
          );

          return res.status(200).json(
            Object.assign(returnData, {
              success: true,
              message: "登录成功",
              result: token,
            })
          );
        } else {
          console.log("密码错误");
          return res
            .status(200)
            .json(
              Object.assign(returnData, { success: false, message: "密码错误" })
            );
        }
      } else {
        console.log("该用户未注册");
        return res.status(200).json(
          Object.assign(returnData, {
            success: false,
            message: "该用户未注册",
          })
        );
      }
    } catch (err) {
      console.error("登录失败:", err);
      return res.status(500).json(
        Object.assign(returnData, {
          code: 500,
          success: false,
          message: "登录失败",
        })
      );
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
  // 用户信息列表查询
  userList: async (req: Request, res: Response) => {
    const allUser = await User.find();
    const returnData = {
      code: 200,
      success: true,
      message: "成功",
      result: {
        records: allUser,
      },
      timestamp: new Date().getTime(),
    };
    return res.status(200).json(returnData);
  },
  // 删除用户
  delUser: async (req: Request, res: Response) => {
    const { id } = req.body;
    console.log("用户id", id);
    const result = await User.findOneAndDelete({ _id: id });
    const returnData = {
      code: 200,
      message: "删除成功",
      success: true,
      timestamp: new Date().getTime(),
    };
    console.log(result);
    return res.status(200).json(returnData);
  },
};

export default authController;
