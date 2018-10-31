const express=require("express")
const router=express.Router()
const pool=require("../pool")

/*根据点击的账号id查询账号图片 */
router.get('/gamegallery',(req,res)=>{
    var game_id=req.query.game_id;
    var sql="SELECT * FROM zhw_game_gallery where game_id=?"
    pool.query(sql,[game_id],(err,result)=>{
        if(err) console.log(err);
        //res.send(result);
        res.writeHead(200,{
          "Content-Type":"application/json;charset=utf-8",
          "Access-Control-Allow-Origin":"*"
        })
        res.write(JSON.stringify(result));
        res.end();
        
      })
    })
/*根据点击的账号id查询账号详情 */
router.get('/details',(req,res)=>{
  var game_id=req.query.game_id;
  var $date=req.query.date;
  var sql="SELECT * FROM zhw_game_details where game_id=?"
  pool.query(sql,[game_id],(err,result)=>{
    if(err) console.log(err);
    res.writeHead(200,{
      "Content-Type":"application/json;charset=utf-8",
      "Access-Control-Allow-Origin":"*"
    })
    res.write(JSON.stringify(result));
    res.end();
    console.log("           "+$date+"           有人刚才查看了"+game_id+"号游戏账号");
  })
})
/*查询当前账号剩余时间 */
router.get('/lease',(req,res)=>{
  var game_id=req.query.game_id;
  var sql="SELECT * FROM zhw_lease where game_id=?"
  pool.query(sql,[game_id],(err,result)=>{
    if(err) console.log(err);
    res.writeHead(200,{
      "Content-Type":"application/json;charset=utf-8",
      "Access-Control-Allow-Origin":"*"
    })
    res.write(JSON.stringify(result));
    res.end();
  })
})
/*删除到期账号*/
router.get('/remove',(req,res)=>{
  var game_id=req.query.game_id;
  var sql="DELETE FROM zhw_lease WHERE game_id=?"
  pool.query(sql,[game_id],(err,result)=>{
    if(err) console.log(err);
    res.writeHead(200,{
      "Content-Type":"application/json;charset=utf-8",
      "Access-Control-Allow-Origin":"*"
    })
    console.log("                         "+game_id+"号商铺租用时长到期，已重新上架！")
    res.end();
  })
})
module.exports=router;