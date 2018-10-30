$(function(){
    var uname=decodeURI(location.search.split("=")[1]);
    /*首先判断用户是否登录 */
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
    $.ajax({
        url:"http://localhost:1997/user/data",
        type:"post",
        data:{uname},
        dataType:"json",
        success:function(res){
            var {
                avatar,
                balance,
                freeze,
                frequency,
                gender,
                nickname,
                phone,
                redPacket,
                uid,
                uname,
                upwd
            }=res[0]
            var html=`
                <div class="balance">
                    <img src="zuhao/psonHZ_03no.png" alt="">
                        <div>可以余额<br><span>￥${balance}</span></div>
                        <div class="r-dataShu"></div>
                        <div>不可用余额<br><span>￥${freeze}</span></div>
                        <div class="r-dataShu"></div>
                        <div>红包<br><span>￥${redPacket}</span></div>
                        <div><a href="topup.html?uname=${uname}">充值</a></div>
                    </div>
                    <div class="r-status">
                        <span>今日我的订单 <u>1</u></span>
                        <span>今日我出租的订单 <u>0</u></span>
                        <span>出租中的账号 <u>0</u></span>
                    </div>
            `
        $("#balance").html(html)
        if(nickname==null) nickname="给自己起个名字吧！"
            var html=`
            <p>${nickname} <img src="zuhao/user_dengji.png" alt=""> </p>
                    <p>账号安全：<span class="r-bar"><b></b></span>安全 </p>
                    <p>信誉：一般</p>
                    <p>
                        <a href="" class="r-dataImgsBg r-dataImgs1"></a>
                        <a href="" class="r-dataImgsBg r-dataImgs2"></a>
                        <a href="" class="r-dataImgsBg r-dataImgs3"></a>
                        <a href="" class="r-dataImgsBg r-dataImgs4"></a>
                    </p>
            `
        $("#nickname").html(html)
        }
    })
    /*充值方式 */
    var $zfb=$(".zfb");
    var $wx=$(".wx");
    var $img=$(".r-t-topupa>img")
    $zfb.click(function(){
        $(this).addClass("hover").next().removeClass("hover");
        $img.attr("src","zuhao/alipay_p.png");
    })
    $wx.click(function(){
        $(this).addClass("hover").prev().removeClass("hover");
        $img.attr("src","zuhao/wxpay_p.png");
    })
    /*充值 */
    var $topup=$("#rtopup");
    $topup.click(function(){
        var myDate = new Date();
        var m=myDate.getMinutes(); 
        var h=myDate.getHours(); 
        var date=h+":"+m
        var up=$(".r-t-topupa [type=text]").val()//充值金额
        if(up>0){
            $.ajax({
                url:"http://localhost:1997/user/recharge",
                type:"post",
                data:{uname,up,date},
                dataType:"json",
                success:function(res){
                    location.reload(true)
                }
            })
        }
    })
})