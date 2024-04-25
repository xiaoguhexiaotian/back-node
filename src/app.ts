// src/app.ts

import express from "express";
import { dbConfig } from "./config/db.config"; // 引入数据库配置文件
import { initSession } from "./middleware/session/index";
import { initRoute } from "./routes/index";
import { initErrorHandler } from "./middleware/error/index";
import { initBodyParser } from "./middleware/bodyParser";
import { PORT } from "./middleware/env/index";
import { initSocket } from "./socket/chat";
// 初始化服务
const initService = () => {
  const app = express();

  dbConfig();

  // 注册bodyParser中间件
  initBodyParser(app);
  // 注册会话缓存
  initSession(app);
  // 注册路由接口
  initRoute(app);
  // 注册错误中间件
  initErrorHandler(app);
  // 初始化socket
  initSocket();

  app.listen(PORT, () => {
    console.log("服务端已启动,正在监听端口", PORT);
  });
};

initService();
