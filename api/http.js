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

// 查询所有页面数据（包含父级页面）
app.get("/pages/pages_selectAllWithParent", function (req, res) {
  db.pages_selectAllWithParent(function (data) {
    res.json(data);
  });
});

// ******************************userType-用户类型信息***********************************
app.get("/userType/userType_selectType", function (req, res) {
  db.userType_selectType(function (data) {
    res.json(data);
  });
});

// 用户类型-根据用户类型名称搜索
app.get("/userType/userType_selectByTypeName", function (req, res) {
  db.userType_selectByTypeName(req.query.typename, function (data) {
    if (data.length > 0) {
      res.json({ status: 0, msg: "查询成功", data: data });
    } else {
      res.json({ status: 1, msg: "暂无数据" });
    }
  });
});

// 用户类型-根据 id 删除用户类型
app.get("/userType/deleteById", function (req, res) {
  db.userType_deleteById(req.query.id, function (data) {
    if (data.affectedRows > 0) {
      res.json({ status: 1, msg: "删除成功", data: data });
    } else {
      res.json({ status: 0, msg: "删除失败", data: data });
    }
  });
});

// 用户类型-新增和编辑数据
app.get("/userType/userType_addAndEdit", function (req, res) {
  db.userType_addAndEdit(
    req.query.id,
    JSON.parse(req.query.usertype),
    function (data) {
      // console.log(data, "data");
      if (data.affectedRows > 0) {
        res.json({ status: 0, msg: "操作成功", data: data });
      } else {
        res.json({ status: 1, msg: "操作失败", data: data });
      }
    }
  );
});

// 用户类型-根据id查询用户类型数据
app.get("/usertype/selectById", function (req, res) {
  db.usertype_selectById(req.query.id, function (data) {
    if (data.length > 0) {
      res.json(data);
    }
  });
});
// 端口
app.listen(3000, function () {
  console.log("服务器已启动，监听端口3000");
});
