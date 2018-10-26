//模块
const express=require('express');
const bodyParser=require('body-parser');
const session=require('express-session');
//路由文件
const user=require('./routes/user.js')
const search=require('./routes/search.js')
const detail=require('./routes/account-detail.js')

var app=express();
app.listen(1997);
//配置session
app.use(session({
	secret: '128位随机字符串',
	resave: false,
	saveUninitialized: true,
  }))
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({
	extended:false
}));
console.log("           租号玩服务器运行中 ...")

app.use('/user',user);
app.use('/search',search);
app.use('/detail',detail);