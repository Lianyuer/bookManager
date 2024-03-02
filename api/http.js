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

// 根据id删除页面
app.get("/pages/pages_delById", function (req, res) {
  db.pages_delById(req.query.id, function (data) {
    if (data.affectedRows > 0) {
      res.json({ status: 0, msg: "删除成功" });
    } else {
      res.json({ status: 1, msg: "删除失败" });
    }
  });
});

// 根据id查询某个页面的信息
app.get("/pages/pages_selectById", function (req, res) {
  db.pages_selectById(req.query.id, function (data) {
    res.json(data);
  });
});
// 新增和编辑页面信息
app.get("/pages/pages_addAndEdit", function (req, res) {
  db.pages_addAndEdit(
    req.query.id,
    JSON.parse(req.query.pages),
    function (data) {
      if (data.affectedRows > 0) {
        res.json({ status: 0, msg: "操作成功" });
      } else {
        res.json({ status: 1, msg: "操作失败" });
      }
    }
  );
});

// 根据类型id查询页面信息
app.get("/pages/pages_selectByTid", function (req, res) {
  db.pages_selectByTid(req.query.tid, function (data) {
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
app.get("/usertype/usertype_selectById", function (req, res) {
  db.usertype_selectById(req.query.id, function (data) {
    if (data.length > 0) {
      res.json(data);
    }
  });
});

// ***************************usertype_pages-用户类型和页面之间的关系*******************************
app.get("/usertype_pages/add", function (req, res) {
  let tid = req.query.tid;
  let pids = req.query.pids;
  let count = 0; // 累加器
  // 删除
  db.usertype_pages_deleteByTid(tid, function (data) {
    for (let i = 0; i < pids.length; i++) {
      // 新增
      db.usertype_pages_add(tid, pids[i], function (data1) {
        if (data1.affectedRows > 0) {
          count++;
        }
        if (count == pids.length) {
          res.json({ status: 0, msg: "操作成功" });
        }
        // else {
        //   res.json({ status: 1, msg: "操作失败" });
        // }
      });
    }
  });
});

// ***************************user-用户信息表*******************************
// 查询所有用户信息数据
app.get("/user/user_selectAll", function (req, res) {
  db.user_selectAll(function (data) {
    res.json(data);
  });
});

// 根据id删除用户信息
app.get("/user/user_deleteById", function (req, res) {
  db.user_deleteById(req.query.id, function (data) {
    if (data.affectedRows > 0) {
      res.json({ status: 0, msg: "删除成功" });
    } else {
      res.json({ status: 1, msg: "删除失败" });
    }
  });
});

// 根据id查询用户信息数据
app.get("/user/user_selectById", function (req, res) {
  db.user_selectById(req.query.id, function (data) {
    res.json(data);
  });
});

// 新增和编辑用户信息数据
app.get("/user/user_addAndEdit", function (req, res) {
  db.user_addAndEdit(
    req.query.id,
    JSON.parse(req.query.userInfo),
    function (data) {
      if (data.affectedRows > 0) {
        res.json({ status: 0, msg: "操作成功" });
      } else {
        res.json({ status: 1, msg: "操作失败" });
      }
    }
  );
});

// 端口
app.listen(8888, function () {
  console.log("服务器已启动，监听端口8888");
});
