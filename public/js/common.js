//定义$(id)
function $(id){
	return document.getElementById(id);
}
//AJAX
function createXhr(){
	var xhr=null;
	if(window.XMLHttpRequest){
		xhr=new XMLHttpRequest();
	}else{
		xhr=new ActiveXObject("Microsoft.XMLHttp");
	}
	return xhr;
}