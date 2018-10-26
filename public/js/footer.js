$(function(){
    //1. 动态创建link引用header.css
    $("<link rel='stylesheet' href='css/footer.css'>").appendTo("head")
    //2. ajax请求header.html片段
    $.ajax({
      url:"http://localhost:1997/footer.html",
      type:"get",
      success:function(res){
        $("footer").replaceWith(res)
        }
    })
})