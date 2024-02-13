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
      res.json({ status: 1, msg: "登录成功", data: data });
    } else {
      res.json({ status: 0, msg: "用户名或密码错误" });
    }
  });
});

// ******************************pages-页面信息表***********************************
app.get("/pages/pages_selectAll", function (req, res) {
  db.pages_selectAll(function (data) {
    res.json(data);
  });
});

// ******************************userType-用户类型信息***********************************
app.get("/userType/userType_selectType", function (req, res) {
  db.userType_selectType(function (data) {
    res.json(data);
  });
});
// 端口
app.listen(3000, function () {
  console.log("服务器已启动，监听端口3000");
});
