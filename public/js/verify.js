var $down=$("#down");
setInterval(function(){
    var i=$down.html()-1;
    if(i==0){
        var url=location.search.slice(1);
        location.href="login.html"+"?back=account-detail.html?"+url;
        return;
    }
    $down.html(i);
},1000)