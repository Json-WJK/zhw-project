$(function(){
  var game_family_id=decodeURI(location.search.split("=")[1]);
  var pno=0;
  function search(pnos=0){
    pno=pnos;
    $.ajax({//如果没有传搜索的值则默认显示这些
      url:"http://localhost:1997/search/gamelist",
      type:"get",
      data:{game_family_id,pno},
      dataType:"json"//ajax可自动将json转为obj
    })
    .then(function(output){
      var {count,
        pageCount,
        pageSize,
        pno,
        products}=output;
      var html="";
      var a="";
      var span="";
      for(var div of products){
        var {	
          game_id,
          game_overall_img,
          game_rent,
          game_describe,
          game_server,
          game_number,
          game_brand,
          game_prices,
          game_hire,
          game_starting,
          game_come,
          game_family_id}=div;
        html+=`<div>
                    <div class="account-list-a">
                        <a href="account-detail.html?game_id=${game_id}"><img src="${game_overall_img}" alt="" width:></a>
                    </div>
                    <div class="account-list-b"> 
                        <a href="account-detail.html?game_id=${game_id}">${game_rent}</a><br>
                        <a href="account-detail.html?game_id=${game_id}">${game_describe}</a><br>
                        <span>${game_server}</span><br>
                        <span>近期出租</span><span>${game_number}</span><span>次</span> </span><span>[到时不下线]</span><br>
                        <a href="account-detail.html?game_id=${game_id}">顶</a><a href="account-detail.html?game_id=${game_id}">商</a><a href="account-detail.html?game_id=${game_id}">赔</a><a href="account-detail.html?game_id=${game_id}">店</a>
                    </div>
                    <div class="account-list-c">
                        <div>
                            租金：<sapn class="rental">${game_prices}</sapn>元/小时<br>
                            押金：<sapn class="rental">${game_hire}</sapn>元<br>
                            <sapn class="rental">${game_starting}</sapn>小时起租（最多999小时)
                        </div>
                    </div>
                    <div class="account-list-d">
                        <button onclick="javascrtpt:window.location.href='account-detail.html?game_id=${game_id}'">立即租用<span>/预约</span></button>
                    </div>
                </div>`;
      }
      for(i=1;i<=pageCount;i++){
        a+=`<a href="#" class="count">${i}</a>`;
      }
      var $paging=$(".paging");
      var presents=parseInt(pno);
      var present=parseInt(presents)+1;
      /*当前页码 结果总数 总共页码*/
      span=`<span>共<b>${count}</b>条记录</span>
      <span>第<b>${present}</b>页/共<b>${pageCount}</b>页</span>`
      $paging.children("span").remove();
      $(".nextpage").after(span);
      /*页码 */
      $paging.children(".count").remove();
      $paging.children().eq(1).after(a);
      // $paging.children().eq(5).css({"bockground":"red"})
      /*查询结果*/
      var element=document.getElementById("account-list").children[1];
      element.innerHTML=html;
      
      // $(".tiaoz").keyup(function(e){
      //   if(e.keyCode==13)
      //   $paging.children("button").click()
      // })
      var $pnone=2;
      var $pnone=$pnone+parseInt(pno);
      $paging.children("a").eq($pnone).css({"background":"#ee3a3d","color":"#fff"});
      if(pno==0){
        $paging.children().eq(1).css("visibility","hidden");
        $paging.children().eq(0).css("visibility","hidden");
      }else{
        $paging.children().eq(1).css({"visibility":"visible","background":"#f1f2f3","color":"#555"});
        $paging.children().eq(0).css({"visibility":"visible","background":"#f1f2f3","color":"#555"});
      }
      if(pno==pageCount-1){
        $paging.children(".nextpage").css("visibility","hidden");
        $paging.children(".lastpage").css("visibility","hidden");
      }else{
        $paging.children(".nextpage").css({"visibility":"visible","background":"#f1f2f3","color":"#555"});
        $paging.children(".lastpage").css({"visibility":"visible","background":"#f1f2f3","color":"#555"});
      }
      window.pageCount=pageCount;
    })
   
  }
  search();

    //游戏分类
    ajax({
        url:"http://localhost:1997/search/gameclassify",
        type:"get",
        dataType:"json"//ajax可自动将json转为obj
      })
      .then(function(res){
        var html="";
        for(var div of res){
          var {	
            classify_img,
            game_family_id,
            game_name}=div;
          html+=`<div><a href="search.html?game_family_id=${game_family_id}"><img src="${classify_img}" alt=""></a></div>`;
        }
        var element=document.getElementById("search-imgs");
        element.innerHTML=html;
      })


    //推荐账号列表
    ajax({
        url:"http://localhost:1997/search/recommendlist",
        type:"get",
        dataType:"json"//ajax可自动将json转为obj
      })
      .then(function(res){
        var html="";
        for(var div of res){
          var {	
            game_id,
            game_overall_img,
            game_rent,
            game_describe,
            game_server,
            game_number,
            game_brand,
            game_prices,
            game_hire,
            game_starting,
            game_come,
            game_family_id}=div;
          html+=`<div>
          <a href="#"><img src="${game_overall_img}" alt=""></a>
          <div>
              <span>销量：<em>${game_number}</em></span><span><em>${game_prices}</em>元/小时</span>
          </div>
          <a href="#">${game_describe}</a>
      </div>`;
        }
        var element=document.getElementById("recommend-list").children[1];
        element.innerHTML=html;
      })

      function paging(){
        var $paging=$(".paging");
      $paging.on("click","a",function(e){
        e.preventDefault()
        var $a=$(this);
        if($a.html()=="首页"){
          var pnos=0;
        }else if($a.html()=="上一页"){
          var pnos=pno-1;
        }else if($a.html()=="下一页"){
          var pnos=pno+1;
        }else if($a.hasClass("count")){
          var pnos=$a.html()-1;
        }
        search(pnos)
      })
      }
      paging()

    /* 手动输入页码跳转事件 */
    var $paging=$(".paging");
    var tiaoz=$(".tiaoz");
    $paging.children("button").click(function(){
      var $val=tiaoz.val()-1;
      var pnos=$val;
      if($val>=0 && $val<pageCount){
        search(pnos);
      }
    })
    var tiaok=$paging.children("button");
    console.log($paging.children("button"))
    tiaoz.keyup(function(e){
        if(e.keyCode==13)
        tiaok.click()
    })
})