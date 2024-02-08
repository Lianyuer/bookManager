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

// 登录接口
app.get("/login", function (req, res) {
  db.login(req.query.phone, req.query.password, function (data) {
    console.log(data, "data");
    if (data.length > 0) {
      res.json({ status: 1, msg: "登录成功" });
    } else {
      res.json({ status: 0, msg: "用户名或密码错误" });
    }
  });
});

// 端口
app.listen(3000, function () {
  console.log("服务器已启动，监听端口3000");
});
