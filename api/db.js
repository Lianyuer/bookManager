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

// ******************************userType-用户类型信息***********************************
module.exports.userType_selectType = function (callback) {
  let sql = `select * from usertype`;
  execSql(sql, callback);
};
