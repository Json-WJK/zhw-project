$(function(){
    //1. 动态创建link引用header.css
    $("<link rel='stylesheet' href='css/field-fixed.css'>").appendTo("head")
    //2. ajax请求header.html片段
    $.ajax({
      url:"http://localhost:1997/field-fixed.html",
      type:"get",
      success:function(res){
        $("#field-fixed").replaceWith(res)
        }
    })
})