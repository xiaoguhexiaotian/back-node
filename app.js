var express = require("express");
var app = express();

app.get("/hello", function (req, res) {
  res.send("hello express");
});

app.listen(3001, () => {
  console.log("服务端已启动");
});
