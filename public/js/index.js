$(function(){
	$.ajax({
		url:"http://localhost:1997/user/islogin",
		type:"get",
		dataType:"json",
		success:function(res){
			var $logins=$(".logins");
			if(res.ok==1){
				var uname=$(".top-center>ul>li>a.uname").html()
				$.ajax({
					url:"http://localhost:1997/user/data",
					type:"post",
					data:{uname},
					dataType:"json",
					success:function(res){
						var {
							balance,
							uname
						}=res[0]
						html=`
						<img src="zuhao/default.png" alt="">
					<div>
						<p>欢迎您，${uname}</p>
						<p>可用余额:${balance}元</p>
					</div>
						`;
						$(".users").html(html)
						var $url=$(".users>div>p:first-child")
						$url.click(function(){
							location.href="user.html?uname="+uname;
						})
					}
				})
				$logins.next().show();
				$logins.hide();
			}else{
				$logins.next().hide();
				$logins.show();
			}
		}
	})
	
	var bzzxs=document.querySelectorAll("[data-toggle=bzzx]")
	for(var bzzx of bzzxs){
		bzzx.onmouseover=function(){
			var bzzx=this;
			var bzs=bzzx.parentElement.children;
			console.log(bzs.length)
			for(var i=0;i<bzs.length;i++){
				if(i==0||i==2||i==4||i==6){
					bzs[i].className="";
					bzs[i].className+=" help-a";
					bzs[i].className+=" help-ha";
				}
			}
			//var bs=bzs[0].split(0,bzs[0].length-11);
			//console.log(bs)
			bzzx.className+=" help-color";
			console.log(bzs[0].className)
			var uls=document.getElementById("bzzxs").children;
			//console.log(uls);
			for(var ul of uls){
				ul.style.zIndex="";
				//console.log(ul);
			}
			var id=bzzx.getAttribute("data-target");
			var div=document.querySelector(id);
			div.style.zIndex=10;
		}
	}

	var zxggs=document.querySelectorAll("[data-toggle=zxgg]");
	for(var zxgg of zxggs){
		zxgg.onmouseover=function(){
			var as=document.querySelectorAll(
				"#zxggs>a"
			);
			for(var a of as){
				a.className=""
			}
			var zxgg=this;
			zxgg.className="rightcolor";
			var zxgs=document.querySelectorAll(
				"#zxgs>ul"
			)
			for(var zxg of zxgs){
				zxg.style.zIndex=""
			}
			var id=zxgg.dataset.target;
			document.querySelector(id).style.zIndex=10;
		}
	}
/*轮播特效 */
	var $last=$("div.lunbo1>img:last")
	var $frist=$("div.lunbo1>img:first")
	var $prev=$("div.lunbo1>button.prev")
	var $next=$("div.lunbo1>button.next")
	
	// 自动播放
	function set(){
		var $lb=$("div.lunbo1>img.change")
		$lb.next().addClass("change")
		$lb.removeClass("change")
		if($lb.is($last)) $frist.addClass("change")
	};
	var start=setInterval(function(){set()},3000);
	// 第一张
	$prev.click(function(){
		var $lb=$("div.lunbo1>img.change")
		$lb.prev().addClass("change")
		$lb.removeClass("change")
		if($lb.is($frist)) $last.addClass("change")
	})
	// 最后一张
	$next.click(function(){
		var $lb=$("div.lunbo1>img.change")
		$lb.next().addClass("change")
		$lb.removeClass("change")
		if($lb.is($last)) $frist.addClass("change")
	})
	//移入移除
	$("div.lunbo1").mouseover(function(){clearInterval(start);})
	.mouseout(function(){
		start=setInterval(function(){set()},3000) ;//重新启动
	});
})
