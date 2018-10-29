var $down=$("#down");
setInterval(function(){
    var i=$down.html()-1;
    var url=location.search.slice(1);
    if(i==0){
        location.href="login.html"+"?back="+url;
        return;
    }
    $down.html(i);
},1000)