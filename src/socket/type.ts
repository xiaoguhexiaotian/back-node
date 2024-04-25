export type UserInfo = {
  name: String;
  id: String | Number;
};

export type MsgType = {
  name: String;
  content: String;
  date: number;
};
export type ServerToClientEvents = {
  $updateUser: (users: UserInfo[]) => UserInfo[];
  $name: (name: string) => String;
  $history: (msgList: MsgType[]) => MsgType[];
  $msg: (msg: MsgType) => MsgType;
};
export type ClientToServerEvents = {
  $msg: (content: string) => void;
};
