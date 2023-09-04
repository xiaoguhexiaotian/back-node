// src/app.ts

import express from "express";
import bodyParser from "body-parser"; // 解析请求提放入到Request中的body中
import loginRoutes from "./routes/login"; // 登录
import errorHandler from "./middleware/error/index"; // 错误处理中间件
import { SECRET_KEY } from "./config/app.config"; // 引入应用配置文件
import { expressjwt } from "express-jwt"; // token校验
import { dbConfig } from "./config/db.config"; // 引入数据库配置文件
import session from "express-session"; // 会话缓存

const initService = () => {
  const app = express();

  dbConfig();

  // 使用 express-session 中间件进行会话缓存
  app.use(
    session({
      secret: "your_secret_key", // 用于签名会话 ID 的安全密钥
      resave: false,
      saveUninitialized: true,
    })
  );

  app.use(bodyParser.json()); // 用于解析请求体
  // 注册登录模块/第一个参数为前缀，所以实际的接口地址前需要拼接 /login
  // 中间件处理方法可以加在模块之前,类似前端的请求拦截器
  app.use(
    "/login",
    expressjwt({
      secret: SECRET_KEY,
      algorithms: ["HS256"],
      // requestProperty: "testChen", 校验token后的用户信息默认存放在req.auth中,requestProperty可以自定义字段
    }).unless({
      path: ["/login/password", "/login/register"],
    }),
    loginRoutes
  ); // 设置登录相关的路由前缀

  // 在路由之后使用错误处理中间件
  app.use(errorHandler);

  app.get("/hello", function (req, res) {
    res.send("hello express");
  });

  const port = 3001;

  app.listen(port, () => {
    console.log("服务端已启动,正在监听端口", port);
  });
};

initService();
