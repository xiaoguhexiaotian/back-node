// src/controllers/authController.ts

import { Request, Response, NextFunction } from "express";
import User from "../../models/user";

const jsonWebToken = require("jsonwebtoken");
const generateCaptcha = require("../../middleware/code/index"); // 引入验证码生成中间件
//密钥
const SECRET_KEY = "tianwanggaidihu";
const authController = {
  // 注册
  register: async (req: Request, res: Response, next: NextFunction) => {
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
      // 将错误给错误中间件处理
      next(error);
    }
  },
  // 密码登录逻辑
  loginPassword: async (req: any, res: Response, next: NextFunction) => {
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
          const token = jsonWebToken.sign(
            {
              // exp: Math.floor(Date.now() / 1000) + 60 * 0.1,
              userName: username,
            },
            SECRET_KEY,
            {
              expiresIn: 7 * 24 * 60 * 1000, //token有效期 测试token验证，暂时1分钟
            }
          );

          return res.status(200).json(
            Object.assign(returnData, {
              success: true,
              message: "登录成功",
              result: `Bearer ${token}`,
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
    } catch (error) {
      console.error("登录失败:", error);
      next(error);
    }
  },
  // 获取验证码
  sendLoginCode: (req: any, res: Response, next: NextFunction) => {
    const { data, text } = generateCaptcha();
    const returnData = {
      code: 200,
      success: true,
      message: "成功",
      result: {
        img: data,
      },
      timestamp: new Date().getTime(),
    };
    console.log(text);
    req.session.code = {
      text,
      timestamp: Date.now(),
    }; // 将验证码文本存储在会话中
    return res.status(200).json(returnData);
  },
  // 验证码登录逻辑
  loginCode: async (req: any, res: Response, next: NextFunction) => {
    const { username, code } = req.body;
    const storedCode = req.session.code.text;
    // 检查验证码是否存在
    if (!storedCode) {
      return res.status(400).json({ error: "验证码已过期" });
    }
    // 检查验证码是否超过有效期（例如，5分钟）
    const currentTime = Date.now();
    const captchaTimestamp = req.session.code.timestamp;
    const captchaValidityPeriod = 5 * 60 * 1000; // 5分钟的有效期

    if (currentTime - captchaTimestamp > captchaValidityPeriod) {
      // 验证码已过期
      req.session.captcha = null; // 清除过期的验证码
      return res.status(400).json({ error: "验证码已过期" });
    }

    // 验证验证码是否正确
    if (code !== storedCode) {
      return res.status(400).json({ error: "验证码不正确" });
    } else {
      const user = await User.findOne({ username });
      if (user) {
        const token = jsonWebToken.sign(
          {
            userName: username,
          },
          SECRET_KEY,
          {
            expiresIn: 7 * 24 * 60 * 1000, //token有效期 测试token验证，暂时1分钟
          }
        );
        const returnData = {
          code: 200,
          timestamp: new Date().getTime(),
          success: true,
          message: "登录成功",
          result: `Bearer ${token}`,
        };
        return res.status(200).json(returnData);
      }
    }
  },
  // 用户信息列表查询
  userList: async (req: Request, res: Response, next: NextFunction) => {
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
  delUser: async (req: Request, res: Response, next: NextFunction) => {
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
