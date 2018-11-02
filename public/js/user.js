$(function(){
    if(location.search.split("=")[1]==undefined) location.href="index.html"
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
            console.log(res)
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
    var uname=location.search.split("=")[1]
    var myDate = new Date();
    var m=myDate.getMinutes(); 
    var h=myDate.getHours(); 
    var date=h+":"+m
    $.ajax({
        url:"http://localhost:1997/user/lease",
        type:"post",
        data:{uname,date},
        dataType:"json",
        success:function(res){
            var html="";
            /*将返回的结果拼接到一起 */
            for(var i in res.name){//将每个name放入每个account中
                res.account[i].game_name=res.name[i].game_name
            }
            for(var div of res.account){
            var {
                game_describe,
                game_overall_img,
                game_prices,
                game_hire,
                game_name,
                game_id
            }=div
            html+=`
            <div class="be-list">
                <div class="zh-list">
                    <img src="${game_overall_img}" alt="">
                    <div>
                        <p>订单号：107613351 货架号：1937724</p>
                        <p>${game_describe}</p>
                        <p>角色名：${game_name}</p>
                    </div>
                    <div>
                        <p>商品价格：${game_prices}元/小时</p>
                        <p>下单时间：2小时</p>
                        <p>押金：${game_hire.toFixed(2)}</p>
                    </div>
                    <span>已完成</span>
                    <span><a href="account-detail.html?game_id=${game_id}">订单详情</a></span>
                </div>
                <div class="more">
                        查看更多
                </div>
            </div>
            `
        }
            $(".r-tenant").append(html)
            $(".r-classifys").on("click",".r-class-bj",function(){
                $(".r-classifys").children().css("border-bottom","none")
                $(this).css("border-bottom","1px solid red")

                var $list=$(".collect-list")//最后一个
                var $be=$(".be-list")//第一
                var $of=$(".often-list")//中间
                $list.css("display","none")
                $be.css("display","none")
                $of.css("display","none")
                
                if($(this).is($(".r-classifys>span").last())){
                    $list.css("display","block")
                }else if($(this).is($(".r-classifys>span").first())){
                    $be.css("display","block")
                }else $of.css("display","block")
            })
        }
    })
})