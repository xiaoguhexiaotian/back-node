import bodyParser from "body-parser"; // 解析请求提放入到Request中的body中

export const initBodyParser = (app: any) => {
  app.use(bodyParser.json()); // 用于解析请求体
};
