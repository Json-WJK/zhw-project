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
