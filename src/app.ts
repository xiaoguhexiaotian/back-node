// src/app.ts

import express from "express";
import bodyParser from "body-parser";
import authRoutes from "./routes/login";

const app = express();

app.use(bodyParser.json());
// 注册登录模块/第一个参数为前缀，所以实际的接口地址为/auth/login
app.use("/auth", authRoutes); // 设置登录相关的路由前缀

app.get("/hello", function (req, res) {
  res.send("hello express");
});

const port = 3001;

app.listen(port, () => {
  console.log("服务端已启动,正在监听端口", port);
});
