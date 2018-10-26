$(function(){
    //1. 动态创建link引用header.css
    $("<link rel='stylesheet' href='css/header.css'>").appendTo("head")
    //2. ajax请求header.html片段
    $.ajax({
      url:"http://localhost:1997/header.html",
      type:"get",
      success:function(res){
        $("header").replaceWith(res)
        var $input=$("input.sousuo")
        var $button=$("input[type='button']")
        $button.click(function(){
            var kw=$input.val().trim();//获取input里的值
            if(kw!=="")
            location.href=`seek.html?kwords=${kw}`//拼接到url上发送给后台
        })
        if(location.search.indexOf("kwords")!=-1){
            var kwords=decodeURI(location.search.split("=")[1])
            $input.val(kwords)
        }
        /*搜索框 */
        $input.keyup(function(e){
            if(e.keyCode==13)
            $button.click()
        })
        $input.focus(function(){
            $input.val("");
        });

        /*带当前url前往登录页面*/
        $(".top-dl").click(function(){
            location.href="login.html?back="+location.href;
          })
          
        
        }
        

    })
     /*登录与注销 */
    
    
    $.ajax({
        url:"http://localhost:1997/user/islogin",
        type:"get",
        dataType:"json",
        success:function(res){
        var $uname=$(".top-center>ul>li>a.uname")
        
        if(res.ok==0){
        $(".top-center>ul:last-child").hide().prev().show();
        }else{
        $uname.html(res.uname);
        $(".top-center>ul:last-child").show().prev().hide();
        }
        var out=$(".top-center>ul>li>a.outlg")
        var $hint=out.prev("div.hidden");
        out.click(function(){
            $hint.removeClass("hidden");
        $.ajax({
            url:"http://localhost:1997/user/signout",
            type:"get",
            success:function(){
                setInterval(function(){
                    location.reload(); 
                },2000)      
            }
        })
        })
        
    }
    })
    

})