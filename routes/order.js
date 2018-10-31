const express=require("express")
const router=express.Router()
const pool=require("../pool")

/*选择租用方式 确认租号 */
router.post("/affirm",(req,res)=>{
    var game_id=req.body.game_id;
    var $date=req.body.date;
    var sql="SELECT *,(select game_overall_img from zhw_game_account where game_id=?) as game_overall_img,(select game_starting from zhw_game_account where game_id=?) as game_starting FROM zhw_game_details where game_id=?"
    pool.query(sql,[game_id,game_id,game_id],(err,result)=>{
        if(err) console.log(err);
        //res.send(result);
        res.writeHead(200,{
          "Content-Type":"application/json;charset=utf-8",
          "Access-Control-Allow-Origin":"*"
        })
        res.write(JSON.stringify(result));
        res.end();
        console.log("           "+$date+"           有人正在尝试租用"+game_id+"号游戏账号");
      })
    })

/*租号成功 */
router.post("/add",(req,res)=>{
  console.log(req.body.DateTime)
  var $date=req.body.dates;
  var game_id=req.body.game_id;
  var uname=req.body.uname;
  var myDate=req.body.DateTime;
  var duration=req.body.duration;
  console.log(myDate)
  var sql="INSERT INTO zhw_lease (game_id,uid,starting_date,duration) values(?,(select uid from zhw_user where uname=?),?,?)";
  pool.query(sql,[game_id,uname,myDate,duration],(err,result)=>{
      if(err) console.log(err);
      //res.send(result);
      res.writeHead(200,{
        "Content-Type":"application/json;charset=utf-8",
        "Access-Control-Allow-Origin":"*"
      })
      res.write(JSON.stringify(result));
      res.end();
      console.log("           "+$date+"               "+uname+"租用了"+game_id+"号游戏账号");
    })
  })
/*租号完成 扣费 */
router.post("/fee",(req,res)=>{
	var $down=req.body.down;
	var $uname=req.body.uname;
	var $date=req.body.date;
	var sql="update zhw_user set balance=balance-? where uname=?";
	pool.query(sql,[$down,$uname],(err,result)=>{
		if(err) console.log(err);
		res.writeHead(200,{
			"Content-Type":"application/json;charset=utf-8",
			"Access-Control-Allow-Origin":"*"
		})
		res.write(JSON.stringify(result));
		res.end();
		console.log("           "+$date+"           从"+$uname+"账户扣除了"+$down+"元");
	})
})


module.exports=router;