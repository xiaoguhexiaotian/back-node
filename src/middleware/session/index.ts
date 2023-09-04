import session from "express-session"; // 会话缓存

export const initSession = (app: any) => {
  // 使用 express-session 中间件进行会话缓存
  app.use(
    session({
      secret: "your_secret_key", // 用于签名会话 ID 的安全密钥
      resave: false,
      saveUninitialized: true,
    })
  );
};
