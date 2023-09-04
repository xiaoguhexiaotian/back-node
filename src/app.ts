// src/app.ts

import express from "express";
import bodyParser from "body-parser"; // 解析请求提放入到Request中的body中
import { dbConfig } from "./config/db.config"; // 引入数据库配置文件
import { initSession } from "./middleware/session/index";
import { initRoute } from "./routes/index";
import { initErrorHandler } from "./middleware/error/index";
// 初始化服务
const initService = () => {
  const app = express();

  dbConfig();

  app.use(bodyParser.json()); // 用于解析请求体
  // 注册会话缓存
  initSession(app);

  // 注册路由接口
  initRoute(app);

  // 注册错误中间件
  initErrorHandler(app);

  const port = 3001;

  app.listen(port, () => {
    console.log("服务端已启动,正在监听端口", port);
  });
};

initService();
