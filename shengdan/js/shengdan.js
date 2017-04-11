window.onload = function(){
	var oW = document.documentElement.clientWidth || document.body.clientWidth;
	var oH = document.documentElement.clientHeight || document.body.clientHeight;
	var oSh = document.documentElement.scrollHeight || document.body.scrollHeight;
	var oBg = document.getElementById("bg");
	var oLoading = document.getElementById('loading');
	var oC = document.getElementById("content");
	var oR = document.getElementById('result');
	var oRe = document.getElementById('re');
	var oNa = document.getElementById('name');
	var oSt = document.getElementById("start");
	var oLh = oSh > oH ? oSh : oH;
	var oLoadingText = document.getElementById('loadingText');
	var oReName = document.getElementById('reName');
	var oReTitle = document.getElementById('reTitle');
	var oReBody = document.getElementById("reBody");
	var uid = getQueryString().uid;
	uid = uid ? uid : "";
	var na = 'nav';
	var oLt = oLoadingText.innerHTML;
	oLoading.style.height = oLh + 'px';
	loadImg();
	set();
	
	
	oRe.onclick = function(){
		oR.style.display = 'none';
		oC.style.display = 'block';	
		oNa.value = '';
	}
	
	oSt.onclick = function(){
		if(oNa.value == ''){
			toast('您还没有输入名字',2600);			
		}else if(oNa.value.length>50){
			toast('您输入的名字过长',2600);			
		}else if(oNa.value != '' && oNa.value.length<50){
			//oR.style.display = 'block';
			//oC.style.display = 'none';	  
			Post('http://localhost:8080/wap2/no-prize.html',{name:oNa.value,uid:uid,orign:na});
			return false;
		}		
	}
	
	window.onresize = function(){
		set();	
	}
	
	function Post(url,data){  
		var req , data = formatParams(data);
		if(window.ActiveXObject){
			req = new ActiveXObject("Microsoft.XMLHTTP");
		}else if(window.XMLHttpRequest){
			req = new XMLHttpRequest();
		}
		if(req){  
			oLoading.style.display = 'block';
			oLoadingText.innerHTML = '正在提交中···';
			req.open("POST", url, true); 
			req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");     
			req.send(data);  
			req.onreadystatechange = function(responseText,readyState,status){  
				if(req.readyState == 4){  
					var resText = JSON.parse(responseText.currentTarget.responseText); 
					if(req.status == 200){  
						oR.style.display = 'block';
						oC.style.display = 'none';	  
						oLoading.style.display = 'none';
						oLoadingText.innerHTML = oLt;
						oReName.innerHTML = oNa.value;
						
						oReTitle.innerHTML = resText.a;
						oReBody.innerHTML = resText.c;
						//toast(resText.ResultMsg,2000);
					}else{
						oLoading.style.display = 'none'; 
						oLoadingText.innerHTML = oLt;
						//toast(resText.ResultMsg,2000);
					}  
				}  
			}  
		}  
	}
	
	function toast(msg,time){
		var oT = document.getElementById('toast');
		if(!oT){
			var oDiv = document.createElement('div');
			oDiv.className = 'animated-slow fadeIn toast';
			oDiv.id = 'toast'
			oDiv.innerHTML = msg;
			document.body.appendChild(oDiv);
			setTimeout(function(){
				document.body.removeChild(oDiv);	
			},time);	
		}
	}
	
	function formatParams(data) {
		var arr = [];
		for (var name in data) {
			arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
		}
		return arr.join("&");
	}
	
	function set(){
		var oW = document.documentElement.clientWidth || document.body.clientWidth;
		var oH = document.documentElement.clientHeight || document.body.clientHeight;
		oBg.style.width = oW + 'px';
		oBg.style.height = oH + 'px';
		oBg.style.backgroundSize = 'cover';	
	}
	
	function loadImg() {
		var oLoading = document.getElementById('loading');
		var imgArr = ['bg.jpg','1.png','ho2.png','img1.jpg'];
		var num = 0;		
		for(var i=0;i<imgArr.length;i++){
			var Img = new Image();
			Img.src = 'images/'+ imgArr[i];
			Img.onload = function(){
				num++;
				if(num == imgArr.length){
					oLoading.style.display = 'none';
				}
			};
			Img.onerror = function(){
				oLoading.style.display = 'none';
			};
		}
	}
	
	function getQueryString(){
		var qs = location.search.length > 0 ? location.search.substring(1) : '' , args = {} , items = qs.length ? qs.split('&') : [] , item = null , name = null ,value = null , i = 0 , len = items.length;	
		for(i=0;i<len;i++){
			item = items[i].split('=');
			name = decodeURIComponent(item[0]);
			value = decodeURIComponent(item[1]);
			if(name.length){
				args[name] = value;
			}
		}
		return args;
	}
}