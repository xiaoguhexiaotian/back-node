import { Server } from "socket.io";
import {
  UserInfo,
  MsgType,
  ClientToServerEvents,
  ServerToClientEvents,
} from "./type";

const history: MsgType[] = []; // 聊天历史记录 {name:string, content:string, date: number}
let nextId = 1; // 下一个用户的id
const users = new Set<UserInfo>(); // 用户数组

export const initSocket = () => {
  const io = new Server<ClientToServerEvents, ServerToClientEvents>({
    path: "/",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("有新用户进来了");
    // 分配用户名
    const userInfo = {
      name: `游客${nextId++}`,
      id: nextId,
    };
    users.add(userInfo);
    // 广播通知所有用户（含自己)
    io.emit("$updateUser", [...users]);
    // 发送聊天记录
    socket.emit("$history", history);
    // 告知用户名
    socket.emit("$name", userInfo.name);

    // 监听聊天消息
    socket.on("$msg", (content: string) => {
      const msg: MsgType = {
        name: userInfo.name,
        content,
        date: Date.now(),
      };
      history.push(msg);
      // 广播消息
      socket.broadcast.emit("$msg", msg);
    });

    socket.on("disconnect", () => {
      console.log(`用户${userInfo.name}退出了聊天`);
      // 清除用户
      users.delete(userInfo);
      // 广播通知所有用户
      socket.broadcast.emit("$updateUser", [...users]);
    });
  });

  io.listen(3002);
};
