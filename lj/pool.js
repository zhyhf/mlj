const mysql = require('mysql');

module.exports = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'lj',
  port: 3306,
  connectionLimit: 5
});