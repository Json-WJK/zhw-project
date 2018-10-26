const express=require("express")
const router=express.Router()
const pool=require("../pool")
//游戏分类
router.get('/gameclassify',(req,res)=>{
  var sql="SELECT * FROM zhw_game_classify"
  pool.query(sql,[],(err,result)=>{
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


//游戏查询结果列表
router.get('/gamelist',(req,res)=>{
    var output={ pageSize:20};//每页20个商品
    output.pno=req.query.pno;//获取当前页码
    var sql="SELECT * FROM zhw_game_account"
    pool.query(sql,[],(err,result)=>{
        if(err) console.log(err);
        output.count=result.length//查询结果总长度
        output.pageCount=Math.ceil(/*计算总页数*/output.count/output.pageSize);
        output.products=
          result.slice(
            output.pno*output.pageSize,
            output.pno*output.pageSize+output.pageSize
          );
        res.writeHead(200,{
          "Content-Type":"application/json;charset=utf-8",
          "Access-Control-Allow-Origin":"*"
        })
        res.write(JSON.stringify(output));
        res.end();
      })
    })

    /*游戏分类显示 */

    router.get('/classifylist',(req,res)=>{
      var output={ pageSize:20};//每页20个商品
      output.pno=req.query.pno;//获取当前页码
      var game_family_id=req.query.game_family_id;
      console.log(game_family_id)
      var sql="SELECT * FROM zhw_game_account where game_family_id=?"
      pool.query(sql,[game_family_id],(err,result)=>{
          if(err) console.log(err);
          output.count=result.length//查询结果总长度
          output.pageCount=Math.ceil(/*计算总页数*/output.count/output.pageSize);
          output.products=
            result.slice(
              output.pno*output.pageSize,
              output.pno*output.pageSize+output.pageSize
            );
          res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
          })
          res.write(JSON.stringify(output));
          res.end();
        })
      })

//推荐游戏列表
router.get('/recommendlist',(req,res)=>{
  var sql="SELECT * FROM zhw_game_account where game_family_id=1005 ORDER BY game_id"
  pool.query(sql,[],(err,result)=>{
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

  /*搜索！！！ */
router.get("/seek",(req,res)=>{
  var output={ pageSize:20};//每页商品个数
  output.pno=req.query.pno;//获取当前页码
  var kwords=req.query.kwords;//这个是地址栏传过来的要查询的东西
  var arr=kwords.split(" ")//这个是防止多个数据有空格，所以切割一下
  for(var i=0;i<arr.length;i++){//如果有多个就遍历添加查询语句需要的代码
  arr[i]=`game_describe like '%${arr[i]}%'`
  }
  var where=" where "+arr.join(" and ");//这个是拼接一会儿查询语句用
  var sql="select * from zhw_game_account";//这个是前半部分sql语句
  pool.query(sql+where/*这两个值拼接在一起就是一个完整的sql语句*/,[],(err,result)=>{
    if(err) console.log(err)
    output.count=result.length//查询结果总长度
    output.pageCount=Math.ceil(/*计算总页数*/output.count/output.pageSize);
    output.products=
      result.slice(
        output.pno*output.pageSize,
        output.pno*output.pageSize+output.pageSize
    );
    res.writeHead(200,{
      "Content-Type":"application/json;charset=utf-8",
      "Access-Control-Allow-Origin":"*"
    })
    if(output.products.length>0)
    res.write(JSON.stringify(output))
    else
    res.write(JSON.stringify({result:0}))
    res.end()
  })
  
})
// where title like '%macbook%' and title like '%i5%' and title like '%128g%'
module.exports=router;