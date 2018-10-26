const express=require("express")
const router=express.Router()
const pool=require("../pool")

/*根据点击的账号id查询账号详情 */
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

router.get('/details',(req,res)=>{
  var game_id=req.query.game_id;
  var sql="SELECT * FROM zhw_game_details where game_id=?"
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


module.exports=router;