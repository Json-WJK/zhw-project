$(function(){
    var uname=location.search.split("=")[1];
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
                        <div>充值</div>
                    </div>
                    <div class="r-status">
                        <span>今日我的订单 <u>1</u></span>
                        <span>今日我出租的订单 <u>0</u></span>
                        <span>出租中的账号 <u>0</u></span>
                    </div>
            `
        $("#balance").html(html)
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
    $.ajax({
        url:"http://localhost:1997/user/lease",
        type:"post",
        data:{uname},
        dataType:"json",
        success:function(res){
            console.log(res)
            var {
                game_describe,
                game_overall_img,
                game_name,
                game_prices,
                game_hire
            }=res[0]
            html=`
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
                    <p>押金：${game_hire}</p>
                </div>
                <span>已完成</span>
                <span>订单详情</span>
            </div>
            `
            $(".r-tenant").append(html)
        }
    })
})