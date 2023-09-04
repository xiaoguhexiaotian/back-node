import { Mongoose } from "mongoose";

export const mongoose = new Mongoose();
// 1.引入mongoose
export const dbConfig = () => {
  // 2.连接mongodb数据库
  // 指定连接数据库后不需要存在，当你插入第一条数据库后会自动创建数据库
  /*
mongoose.connect('mongodb://数据库地址:端口号/数据库名',{useMongoClient:true})
如果端口号是默认端口号(27017)则可以省略不写
*/
  mongoose
    .connect("mongodb://localhost")
    .then(() => console.log("数据库连接成功"))
    .catch((err: any) => console.log("数据库连接失败", err));

  // 3.监听mongodb数据库的连接状态
  // 绑定数据库连接成功事件
  mongoose.connection.once("open", function () {
    console.log("连接成功");
  });
  // 绑定数据库连接失败事件
  mongoose.connection.once("close", function () {
    console.log("数据库连接已经断开");
  });
};
