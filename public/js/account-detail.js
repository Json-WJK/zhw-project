$(function(){
    /*需要用到game_id则使用 */
    if(location.search.indexOf("game_id=")!=-1){
        var game_id=decodeURI(
        location.search.split("=")[1]
        )
    }
    /*请求账号租金详情 */
    var myDate = new Date();
    var m=myDate.getMinutes(); 
    var h=myDate.getHours(); 
    var date=h+":"+m
    $.ajax({
        url:"http://localhost:1997/detail/details",
        type:"get",
        data:{game_id,date},
        dataType:"json",
        success:function(res){
            var html="";
            for(var div of res){
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
                    hire
                }=div;
                html+=`<p>${details_name} （累计出租<span>${adds}</span>次，共计<span>${duration}</span>小时）</p>
                <p>${server}
                    <span>上号方式：<b>上号器上号</b></span>
                </p>
                <div>
                    <div>卖家等级：<img src="zuhao/7.png" alt="">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="zuhao/sfzxx.png">身份证已认证</div>
                    <div>租号限制：	撤单率＜50%	  |  	逃跑/挂单次数≤3次</div>
                    <div>服务承诺：<a>商</a><a>赔</a><a>保</a><a>店</a>
                        <a href="#"><img src="zuhao/ttxz.png" alt=""></a>
                    </div>
                </div>
                <ul id="affirm">
                    <li><span>时租</span><span class="affirm affirms">${hour}元</span></li>
                    <li><span>日租</span><span class="affirms">${day}元</span></li>
                    <li><span>包早</span><span class="affirms">${morning}元</span></li>
                    <li><span>包夜</span><span class="affirms">${night}元</span></li>
                    <li><span>10小时</span><span class="affirms">${hours}元</span></li>
                    <li><span>周租</span><span class="affirms">${week}元</span></li>
                </ul>
                <p>押金 <span>${hire}</span> 元
                    <span><a href="#">租号须知</a></span>
                </p>
                <p>温馨提示： 不得使用或浏览外挂等第三方软件，违反将会扣除押金及租金！</p>
                <input type="button" value="立 即 租 用 / 预 约">`;
            }
            $(".particulars-top").html(html);  

            /*选择租用方式 */
            var $spans=$("#affirm").children().children(".affirms").removeClass("affirm");
            $spans.on("click",function(){
                var $span=$(this);
                $spans.removeClass("affirm");
                $span.addClass("affirm");
            })
            
            $.ajax({
                url:"http://localhost:1997/user/islogin",
                type:"get",
                dataType:"json",
                success:function(res){
                    /*立即租号 */
                $("input[type=button]").click(function(){
                    var url1=location.pathname.slice(1);
                    var url2=location.search.slice(1)
                    if(res.ok==0) location.href="verify.html"+"?"+url1+"?"+url2;
                    if(res.ok==1) location.href=`order.html?game_id=${game_id}`;
                })
                }
            })
           
        }
    })
    //推荐账号列表
    
    $.ajax({
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
        var element=document.getElementById("recommend-list").children[0];
        element.innerHTML=html;
        })
        
        /*左侧图片 */
        $.ajax({
            url:"http://localhost:1997/detail/gamegallery",
            type:"get",
            data:{game_id},
            dataType:"json"//ajax可自动将json转为obj
            })
            .then(function(res){  
                var imgx=res[0].game_md;
                var $med=$("#medium-img").children();
                var $max=$("#max-img");
                $med.attr("src",imgx);
                $max.css("background-image",`url(${imgx})`);
                var html="";
                for(var div of res){
                    var{	
                    gallery_id,
                    game_id,
                    game_sm,
                    game_md,
                    game_lg
                    }=div;
                    html+=`<img src="${game_sm}" alt="" data-imgs="${game_md}">`;
                }
                var element=$("#min-img");
                element.html(html);
   
            })

            
})

    var $min=$("#min-img");
    var $med=$("#medium-img").children();
    var $max=$("#max-img");
    
    $min.on("mouseenter","img",function(e){
        var img=e.target;
        var imgx=img.dataset.imgs;
        $med.attr("src",imgx);
        // $max.css(backgroundImage=`url(${imgx})`;
        $max.css("background-image",`url(${imgx})`);
    })


var $mask=$(".mask"),//透明玻璃板
    $smask=$(".smask");//半透明遮罩
var MSIZE=160,//mask的大小
    MAX=410-MSIZE;//top和left的最大值
$mask
.hover(
    function(){
    $smask.toggleClass("d-none");
    $max.toggleClass("d-none");
    }
)
.mousemove(function(e){
    var left=e.offsetX-MSIZE/2;
    var top=e.offsetY-MSIZE/2;
    if(left<0) left=0; 
    else if(left>MAX) left=MAX;
    if(top<0) top=0;
    else if(top>MAX) top=MAX;
    $smask.css({left,top});
    $max.css("background-position",`-${40/25*left}px -${40/25*top}px`)
})



