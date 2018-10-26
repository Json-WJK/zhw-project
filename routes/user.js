const express=require('express');
//引入mysql连接池
const pool=require('../pool.js');
//创建路由器
var router=express.Router();
//用户注册

//用户登录
router.post('/login',(req,res)=>{
	var uname=req.body.uname;
	var upwd=req.body.upwd;
	console.log(uname,upwd);
	pool.query(
    "select * from zhw_user where uname=? and upwd=?",
    [uname,upwd],
    (err,result)=>{
      if(err) console.log(err);
      if(result.length>0){
        res.writeHead(200);
        var user=result[0]
        req.session.uid=user.uid
        res.write(JSON.stringify({
					ok:1,
					msg:"登录成功！"
        }))
      }else{
        res.write(JSON.stringify({
          ok:0,
          msg:"用户名或密码错误！"
        }))
      }
      res.end();
    }
  )
});

/*用户登录状态 */
router.get("/islogin",(req,res)=>{
	res.writeHead(200);
	if(req.session.uid===undefined){
	  res.write(JSON.stringify({ok:0}))
	  res.end()
	}else{
	  var uid=req.session.uid;
	  var sql="select * from zhw_user where uid=?"
	  pool.query(sql,[uid],(err,result)=>{
		if(err) console.log(err);
		var user=result[0];
		res.write(JSON.stringify({
		  ok:1,uname:user.uname
		}))
		res.end()
	  })
	}	
})
router.get("/signout",(req,res)=>{
req.session["uid"]=undefined;
res.end();
})


router.post('/register',(req,res)=>{
	var obj=req.body;
	var $uname=obj.uname;	
	var $upwd=obj.upwd
	if($uname==""){
		res.send("用户名不能为空")
		return;
	}
	if($upwd==""){
		res.send("密码不能为空")
		return;
	}

	var sql='INSERT INTO zhw_user VALUES(null,?,?,null,null,null)';
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
		 	 res.send("注册成功！");
		}else{
		 	 res.send("注册失败！")
		};
	});
	});


/*验证用户是否存在*/
router.post('/verify',(req,res)=>{
	var $uname=req.body.uname;
	var sql='SELECT * FROM zhw_user where uname=?';
	pool.query(sql,[$uname],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.length>0){
			res.send("1");
		}else{
			res.send("0");
		};

	});
});

module.exports=router;