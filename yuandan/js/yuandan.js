window.onload = function(){
	var oW = document.documentElement.clientWidth || document.body.clientWidth;
	var oH = document.documentElement.clientHeight || document.body.clientHeight;
	var oSh = document.documentElement.scrollHeight || document.body.scrollHeight;
	var oBody = document.body;
	var oBg = document.getElementById("bg");
	var oLoading = document.getElementById('loading');
	var oC = document.getElementById("content");
	var oR = document.getElementById('result');
	var oRe = document.getElementById('re');
	var oNa = document.getElementById('name');
	var oSt = document.getElementById("start");
	var oRimg = document.getElementById('rimg');
	var oLh = oSh > oH ? oSh : oH;
	var oLoadingText = document.getElementById('loadingText');
	var oReName = document.getElementById('reName');
	var oReTitle = document.getElementById('reTitle');
	var oReBody = document.getElementById("reBody");
	var oLt = oLoadingText.innerHTML;
	var uid = getQueryString().u;
	var tempArr = ['能活用一直以来拥有的能力，你的实力被发挥得淋漓尽致的一年。','所以2016年你的生活会围绕着“食”展开，究竟是要吃还是要减肥成为你这一年的重大考验。','持续的以真诚的心态努力的活，想实现的事情都会慢慢兑现的一年。','这一年你的精力异常旺盛，并且充满了魅力，桃花盛开。','充满实力，被大家尊敬又威严的一年。','以前的朋友将会是你的贵人，有助于你今后长久的人际关系发展。','你就像是一个猛将，为了将来更好而累计努力的一年。','你的办事效率快速，也跟着影响周围人的目标前进！','心中一直犹豫的事情，终于有勇气去实践，充满行动力的一年。','身为逗逼，这个属性还将陪伴你度过整个2016年，逗逼生活欢乐多。'];
	uid = uid ? uid : "";
	var na = 'nav'
	oLoading.style.height = oLh + 'px';
	loadImg();
	set();
	
	oRe.onclick = function(){
		oR.style.display = 'none';
		oC.style.display = 'block';	
		oBody.style.backgroundColor = '#f8f8f8';
		oNa.value = '';
		oSt.value = '开始测试';
		oSt.onclick = start;
	}
	
	oSt.onclick = start;
	
	function start(){
		if(oNa.value.trim() == ''){
			toast('您还没有输入名字',2600);			
		}else if(oNa.value.trim().length>50){
			toast('您输入的名字过长',2600);			
		}else if(oNa.value.trim() != '' && oNa.value.trim().length<50){
			Post('http://10.8.8.107/lockimage/getNewYearAnswer.do',{name:oNa.value,uid:uid,orign:na});
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
			oSt.value = '正在提交中···';
			oSt.onclick = null;
			req.open("POST", url, true); 
			req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");     
			req.send(data);  
			req.onreadystatechange = function(responseText,readyState,status){  
				if(req.readyState == 4){  
					var resText = JSON.parse(responseText.currentTarget.responseText); 
					if(req.status == 200){ 
						var oImg = new Image();
						oImg.src = 'images/'+(parseInt(resText.i)+1)+'.png';
						oImg.onload = function(){
							oRimg.src = 'images/'+ (parseInt(resText.i)+1)+'.png';
							oR.style.display = 'block';
							oC.style.display = 'none';
							oBody.style.backgroundColor = '#b71e25';
							oReName.innerHTML = oNa.value;
							oReBody.innerHTML = tempArr[parseInt(resText.i)];	
						};
						oImg.onerror = function(){
							oRimg.src = 'images/'+ (parseInt(resText.i)+1)+'.png';
							oR.style.display = 'block';
							oC.style.display = 'none';
							oBody.style.backgroundColor = '#b71e25';
							oReName.innerHTML = oNa.value;
							oReBody.innerHTML = tempArr[parseInt(resText.i)];	
						};
					}else{
						oLoading.style.display = 'none'; 
						oLoadingText.innerHTML = oLt;
					}  
				}  
			}  
		}  
	}
	
	function reLoad(){
		
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
		oBg.style.height = oLh + 'px';
		oBg.style.backgroundSize = 'cover';	
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
	
	function loadImg() {
		var oLoading = document.getElementById('loading');
		var imgArr = ['content.jpg','1.png','ho2.png','img1.jpg'];
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
	
	String.prototype.trim=function(){ 
		return this.replace(/(^\s*)|(\s*$)/g, ""); 
	}
}