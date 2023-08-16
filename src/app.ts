// src/app.ts

import express from "express";
import bodyParser from "body-parser";
import loginRoutes from "./routes/login";

const app = express();
const { expressjwt } = require("express-jwt");
const SECRET_KEY = "tianwanggaidihu";
require("../config/db.config");

app.use(bodyParser.json());
// 注册登录模块/第一个参数为前缀，所以实际的接口地址前需要拼接 /login
// 中间件处理方法可以加在模块之前,类似前端的请求拦截器
app.use(
  "/login",
  expressjwt({
    secret: SECRET_KEY,
    algorithms: ["HS256"],
    // requestProperty: "testChen", 校验token后的用户信息默认存放在req.auth中,requestProperty可以自定义字段
  }).unless({
    path: ["/login/password"],
  }),
  loginRoutes
); // 设置登录相关的路由前缀

app.use(function (err: any, req: any, res: any, next: any) {
  if (err.name === "UnauthorizedError") {
    const error = {
      code: 500,
      success: false,
      message: "登录已过期请重新登录",
    };
    res.status(401).json(error);
  }
});

app.get("/hello", function (req, res) {
  res.send("hello express");
});

const port = 3001;

app.listen(port, () => {
  console.log("服务端已启动,正在监听端口", port);
});
