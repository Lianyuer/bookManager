const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "bookmanage",
});

connection.connect();

module.exports.login = function (username, pwd, callback) {
  let sql = `select * from user where phone = '${username}' and password = ${pwd}`;
  connection.query(sql, function (err, data) {
    if (err) {
      callback(err);
    } else {
      callback(data);
    }
  });
};
