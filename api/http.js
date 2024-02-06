const cors = require("cors");
const express = require("express");
const db = require("./db");
const app = new express();

app.use(cors());

// 解决跨域
app.all("*", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// 端口
app.listen(3000, function () {
  console.log("服务器已启动，监听端口3000");
});
