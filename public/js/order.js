$(function(){
    if(location.search.indexOf("game_id=")!=-1){
        var game_id=decodeURI(
        location.search.split("=")[1]
        )
    }
    /*防止客户点击后退回到此页面 */
    $.ajax({
        url:"http://localhost:1997/detail/lease",
        type:"get",
        data:{game_id},
        dataType:"json",//ajax可自动将json转为obj
        success:function(res){
            if(res.length==0) return
            var $button=$(".pay>button")
            $button.attr('disabled','disabled').html("账号出租中").css("background","#949694")
        }
    })
    /*首先判断该用户是否登录 */
    $.ajax({
        url:"http://localhost:1997/user/islogin",
        type:"get",
        dataType:"json",
        success:function(res){
            var url1=location.pathname.slice(1);
            var url2=location.search.slice(1)
            if(res.ok==0) location.href="verify.html"+"?"+url1+"?"+url2;
        }
    })
    var myDate = new Date();
    var m=myDate.getMinutes(); 
    var h=myDate.getHours(); 
    var date=h+":"+m
    $.ajax({
        url:"http://localhost:1997/order/affirm",
        type:"post",
        data:{game_id,date},
        dataType:"json",
        success:function(res){
            var {
                details_id,
                game_id,
                game_family_id,
                details_name,
                adds,
                duration,
                server,
                hour,
                day,
                morning,
                night,
                hours,
                week,
                hire,
                game_name,
                game_overall_img,
                game_starting
            }=res[0];
            var html=`
            <div>
                <img src="${game_overall_img}" alt="">
            </div>
            <div>
                <a href="#">${details_name}</a>
                <p>${server}  |  角色名： ${game_name}</p>
            </div>
            <div>
                ${game_starting}小时
            </div>
            <div>
                <span>${hour}</span>元/小时
            </div>
        `
        /*主体内容 */
        $(".message").html(html)
        /*押金 */
        $("#pledge").html(`￥${hire}`)
        /*默认起租时间*/
        var $count=$(".count");
        $count.val(game_starting);
        /*加减租号时长*//*订单金额 *//*订单总价 */
        var $add=$("#add");/*加减租号时长*/
        var $stt=$("#stt");
        var $money=eval($count.val()*hour);/*订单金额 */
        $(".money").html("￥"+$money);
        var $total=$("#total");/*订单总价 */
        $total.html("￥"+($money+hire))
        $add.click(function(){
            var $val=parseInt($count.val())+1;
            $count.val($val)
            $money=eval($count.val()*hour);
            $(".money").html("￥"+$money.toFixed(2));//订单金额
            $total.html("￥"+($money+hire).toFixed(2))/*订单总价 */
        })
        $stt.click(function(){
            var $val=parseInt($count.val())-1;
            if($val!=0) $count.val($val)
            $money=eval($count.val()*hour);
            $(".money").html("￥"+$money.toFixed(2));//订单金额
            $total.html("￥"+($money+hire).toFixed(2))/*订单总价 */
        })
        
        /*下单 */
        var $hint=$(".hint");
        var $PayPwd=$(".PayPwd");
        //出现输入密码界面
        $(".pay>button").click(function(){
            $PayPwd.show()
        })
        
        function win(){//租号成功
            var myDate = new Date();
            var year=myDate.getFullYear();//年
            var month=myDate.getMonth()+1;//月
            var date=myDate.getDate();//日
            var hour=myDate.getHours();//时
            var minute=myDate.getMinutes();//分
            var second=myDate.getSeconds();//秒
            var m=myDate.getMinutes(); 
            var h=myDate.getHours(); 
            var DateTime=year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
            var dates=h+":"+m
            var uname=$(".uname").html();
            var duration=$(".count").val()
            /*支付成功后，将该账号添加至个人信息租过的账号列表中 */
            $.ajax({
                url:"http://localhost:1997/order/add",
                type:"post",
                data:{game_id,uname,DateTime,duration,dates},
                dataType:"json",
                success:function(res){
                }
            })
        }
        function fee(){//完成扣费
            var uname=$(".uname").html();
            var down=$("#total").html().slice(1);
            /*支付成功后，将该账号添加至个人信息租过的账号列表中 */
            $.ajax({
                url:"http://localhost:1997/order/fee",
                type:"post",
                data:{uname,down,date},
                dataType:"json",
                success:function(res){
                }
            })
        }
        function nogame(){//修改账号在搜索页面为不可租状态
            $.ajax({
                url:"http://localhost:1997/order/nogame",
                type:"post",
                data:{game_id},
                dataType:"json",
                success:function(res){   
                }
            })
        }
        function often(){
            var uname=$(".uname").html();
            console.log(uname,game_id)
            $.ajax({
                url:"http://localhost:1997/order/often",
                type:"post",
                data:{game_id,uname},
                dataType:"json",
                success:function(res){   
                }
            })
        }

        // 点击确认下单
        $(".qr").click(function(){
            var uname=$(".top-center>ul>li>a.uname").html()
            $.ajax({
                url:"http://localhost:1997/user/data",
                type:"post",
                data:{uname},
                dataType:"json",
                success:function(res){
                    var {
                        balance
                    }=res[0]
                    /*判定余额是否充足 */
                    if(balance>$total.html().substr(1)){
                        $PayPwd.hide()
                        $hint.show()
                        win()//租号成功 向用户租过的账号添加数据
                        fee()//完成扣费
                        // nogame()//修改账号在搜索页面为不可租状态
                        often()//将租用的账号添加进用户信息中
                    }else{
                        $PayPwd.hide()
                        alert("余额不足，请充值")
                    }
                }
            })
            
        })
        
            
        //点击取消 关闭窗口
        $(".qx").click(function(){
            $PayPwd.hide()
        })

        //温馨提示框确认按钮
        $(".hint>div>button").click(function(){
            $hint.hide()
            // $.ajax({

            // })
        })
        }
        
    })
    
})



