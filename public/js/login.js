$(function(){//login.html中jquery-3.2.1.js
    $("[type=button]").click(function(){
      var uname=$("[type=text]").val();
      var upwd=$("[type=password]").val();
      (async function(){
        var res=await $.ajax({
          url:"http://localhost:1997/user/login",
          type:"post",
          data:{uname,upwd},
          dataType:"json"
        })
        if(res.ok==0)
          $("#pwd").html(res.msg);
        else{
            $("#pwd").html("登录成功！即将返回来时的页面...")
          if(location.search.startsWith("?back=")){
            var url=location.search.slice(6)
          }else{
            var url="index.html"
          }
          setInterval(function(){
            location.href=url;
          },2000)
          
        }
      })()
    })
  })