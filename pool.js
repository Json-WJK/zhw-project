//连接mysql数据库服务器
const mysql=require('mysql');
var pool=mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '',
  database: 'zhw',
  connectionLimit: 20
});
//导出连接
module.exports=pool;