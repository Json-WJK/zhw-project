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

        /*搜索提示 */
        $(".suggest").hide();
        $(".sousuo").keyup(function(){
            // 如果输入了搜索内容
            if(!$(".sousuo").val()==""){
                var kwords=$(".sousuo").val();
                var pno=0;
                console.log($(".sousuo").val())
                $(".suggest").show();
                $.ajax({
                    url:"http://localhost:1997/search/seek",
                    data:{kwords,pno},
                    dataType:"json",
                    success:function(res){
                        var html="";
                        console.log(res)
                        if(res.result==undefined){
                            console.log(res.result)
                            var {
                                products,//账号查询结果列表
                            }=res;
                            for(var i=0;i<6;i++){
                                html += `
                                <li>
                                    <a href="account-detail.html?game_id=${products[i].game_id}"><span>${products[i].game_describe}</span><span>租金：<b>${products[i].game_prices}</b>元/小时</span></a>
                                </li>`
                            }
                        }
                        // 未能查询出结果
                        if(res.result==0){
                            html += `
                                <li>
                                    抱歉，暂无该账号信息！
                                </li>`
                        }
                        $(".suggest").html(html);
                        
                    }
                })
            }
            if($(".sousuo").val() == ""){
                $(".suggest").hide();
            }
        })
        // 失去焦点
        $(".sousuo").blur(function(){
            $(".suggest").hide();
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
            /*查看当前账号信息 */
            $(".uname").prop("href","user.html?uname="+res.uname)
        }
        /*退出登录 */
        var out=$(".top-center>ul>li>a.outlg")
        var $hint=out.prev("div.hidden");
        out.click(function(){
            $hint.removeClass("hidden");
            var myDate = new Date();
            var m=myDate.getMinutes(); 
            var h=myDate.getHours(); 
            var date=h+":"+m
        $.ajax({
            url:"http://localhost:1997/user/signout",
            type:"get",
            data:{date},
            success:function(){
                setInterval(function(){
                    location.href="index.html"//退出登录则返回首页
                },2000)      
            }
        })
        
        })
        
    }
    })

    
})