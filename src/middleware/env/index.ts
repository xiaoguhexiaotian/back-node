import dotenv from "dotenv";
// 注册环境变量
dotenv.config({ path: "../.env" });

export const PORT = process.env.PORT;
