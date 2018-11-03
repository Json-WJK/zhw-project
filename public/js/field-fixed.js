$(function(){
    //1. 动态创建link引用header.css
    $("<link rel='stylesheet' href='css/field-fixed.css'>").appendTo("head")
    //2. ajax请求header.html片段
    $.ajax({
      url:"http://localhost:1997/field-fixed.html",
      type:"get",
      success:function(res){
        $("#field-fixed").replaceWith(res)
/*以上是动态加载 --------------------  分割线 */
        var top=$(".return-top")
        var rtop;//提前定义定时器变量
        var slide;//每次减少高度
        var isuser=false;
        $(document).scroll(function(){
            if(isuser) clearInterval(rtop)
            isuser=true
        }); 
        top.click(function(){
            clearInterval(rtop)
            rtop=setInterval(function(){
                isuser=false;
                var tops=$(document).scrollTop()//当前屏幕高度
                slide=Math.floor(tops-tops/7);
                $(document).scrollTop(slide)
                // if(slide<=99) slide=0
                if(slide==0) clearInterval(rtop)
                //滑动至slide高度
            },25)
        })
           

        }
    })
})