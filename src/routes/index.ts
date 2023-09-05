import loginRoutes, { whiteList } from "./login"; // 登录
import { SECRET_KEY } from "../config/app.config"; // 引入应用配置文件
import { expressjwt } from "express-jwt"; // token校验

export const initRoute = (app: any) => {
  // 注册登录模块/第一个参数为前缀，所以实际的接口地址前需要拼接 /login
  // 中间件处理方法可以加在模块之前,类似前端的请求拦截器
  app.use(
    "/login",
    expressjwt({
      secret: SECRET_KEY,
      algorithms: ["HS256"],
      // requestProperty: "testChen", 校验token后的用户信息默认存放在req.auth中,requestProperty可以自定义字段
    }).unless({
      path: whiteList,
    }),
    loginRoutes
  ); // 设置登录相关的路由前缀
};
