const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "bookmanage",
});

connection.connect();

// 封装一个公共的方法，用于执行，参数需要，ql语句
function execSql(sql, callback) {
  connection.query(sql, function (err, data) {
    if (err) {
      callback(err);
    } else {
      callback(data);
    }
  });
}

// ******************************user-用户信息表***********************************
module.exports.login = function (username, pwd, callback) {
  let sql = `select * from user where phone = '${username}' and password = ${pwd}`;
  execSql(sql, callback);
  // connection.query(sql, function (err, data) {
  //   if (err) {
  //     callback(err);
  //   } else {
  //     callback(data);
  //   }
  // });
};

// ******************************pages-页面信息表***********************************
module.exports.pages_selectAll = function (callback) {
  let sql = `select * from pages`;
  execSql(sql, callback);
};

// 查询所有页面数据（包含父级页面）
module.exports.pages_selectAllWithParent = function (callback) {
  let sql = `select a.*,b.pageName 'parentName' from pages a left join pages b on a.pid=b.id`;
  execSql(sql, callback);
};

// 根据id删除页面
module.exports.pages_delById = function (id, callback) {
  let sql = `delete from pages where id=` + id;
  execSql(sql, callback);
};

// 根据id查询某个页面的信息
module.exports.pages_selectById = function (id, callback) {
  let sql =
    `select a.*,b.pageName 'parentName' from pages a left join pages b on a.pid=b.id where a.id=` +
    id;
  execSql(sql, callback);
};

// 新增和编辑页面信息
module.exports.pages_addAndEdit = function (id, pages, callback) {
  // 新增
  if (id == -1) {
    var sql = `insert into pages(pageName,pageUrl,remark,pid) values('${pages.pageName}','${pages.pageUrl}','${pages.remark}',${pages.pid})`;
  } else {
    // 编辑
    sql = `update pages set pageName='${pages.pageName}',pageUrl='${pages.pageUrl}',remark='${pages.remark}',pid=${pages.pid} where id=${id}`;
  }
  execSql(sql, callback);
};

// ******************************userType-用户类型信息******************************
module.exports.userType_selectType = function (callback) {
  let sql = `select * from usertype`;
  execSql(sql, callback);
};

// 用户类型-根据用户类型名称搜索
module.exports.userType_selectByTypeName = function (name, callback) {
  let sql = `select * from usertype where typeName like '%${name}%'`;
  console.log(sql, "sql");
  execSql(sql, callback);
};

// 用户类型-根据 id 删除用户类型
module.exports.userType_deleteById = function (id, callback) {
  let sql = `delete from usertype where id = ${id}`;
  execSql(sql, callback);
};

// 用户类型-根据id查询用户类型数据
module.exports.usertype_selectById = function (id, callback) {
  let sql = `select * from usertype where id = ` + id;
  execSql(sql, callback);
};

// 用户类型-新增和编辑数据
module.exports.userType_addAndEdit = function (id, userType, callback) {
  if (id == -1) {
    var sql = `insert into usertype values (null,"${userType.typeName}","${userType.remark}")`;
  } else {
    // id 不等于 -1 说明是编辑
    sql = `update usertype set typeName = "${userType.typeName}",remark = "${userType.remark}" where id = ${id}`;
  }
  console.log(sql, "sql");
  execSql(sql, callback);
};
