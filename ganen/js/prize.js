window.onload = function(){
	var oW = document.documentElement.clientWidth || document.body.clientWidth;
	var oH = document.documentElement.clientHeight || document.body.clientHeight;
	var oSh = document.documentElement.scrollHeight || document.body.scrollHeight;
	var oHas = document.getElementById("hasFormSubmit");
	var oNoHasPrize = document.getElementById("noHasPrize");
	var oLoading = document.getElementById('loading');
	var oInput = document.getElementsByTagName("input");
	var oText = document.getElementById('text');
	var oPrize = document.getElementById('prize');
	var oRbg = document.getElementById('rbg');	
	var oLoadingText = document.getElementById('loadingText');
	var oForm = document.getElementById("form");
	var oLt = oLoadingText.innerHTML;	
	var oLh = oSh > oH ? oSh : oH;
	var type = getQueryString().type || 0;
	var u = getQueryString().u;
	var wid = getQueryString().wid;
	oLoading.style.height = oLh + 'px';
	
	if(!u || !wid){
		notPrize('noPrize.jpg');
		return;
	}
		
	if(u && wid){
		switch (type) {
			case '0' : //未中奖
				 notPrize('noPrize.jpg');
				 break;
			case '1' : //中一等奖金立S6手机(不存在)
				 notPrize('noPrize.jpg'); 
				 break;
			case '2' : //中二等奖100元现金红包
				 yesPrize(100); 			 
				 break;
			case '3' : //中三等奖20元现金红包
				 yesPrize(20);
				 break;
			case '4' : //已中奖
				 notPrize('hasPrize.jpg');
				 break;	
			default :  //没有传过来参数
				 notPrize('noPrize.jpg');
				 break;	 		 	 	 	 
		};	
	} 
		
	oInput[1].onclick = function(){
		if(oInput[0].value == ''){
			toast('您还没有输入微信号/手机号',2600);			
		}else{
			Post('http://localhost:8080/wap2/no-prize.html',{u:u,wid:wid,info:oInput[0].value});
			return false;
		}	
	}
			
	oInput[0].onfocus = function(){
		oInput[1].style.color = '#fc2222';
		oInput[1].style.background = '#fff';	
	}
	
	oInput[0].onblur = function(){
		if(this.value == ''){
			oInput[1].style.color = '#fff';
			oInput[1].style.background = 'transparent';	
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
		
	function loadImg(arr,flag) {
		var oLoading = document.getElementById('loading');
		var imgArr = arr;
		var num = 0;
		var m = arr[0].substring(0,arr[0].length-4);		
		for(var i=0;i<imgArr.length;i++){
			var Img = new Image();
			Img.src = 'images/'+ imgArr[i];
			Img.onload = function(){
				num++;
				if(num == imgArr.length){
					oLoading.style.display = 'none';
					flag == true ? setMove(m) : '';
				}
			};
			Img.onerror = function(){
				oLoading.style.display = 'none';
				flag == true ? setMove(m) : '';
			};
		}
	}
	
	function setMove(n){
		oText.src = 'images/'+n+'.png';
		oText.className= 'text'+n+' pa animated-fast bounceIn';
		oPrize.className= 'pic pa animated-fast rotate';	
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
			oLoadingText.innerHTML = '红包正在提交中···';
			if( u != '' && wid != '' && oInput[0].value){
				req.open("POST", url, true);	
			}  
			req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");     
			req.send(data);  
			req.onreadystatechange = function(responseText,readyState,status){  
				if(req.readyState == 4){  
					if(req.status == 200){  
						oForm.style.display = 'none';	
						oHas.style.display = 'block';	  
						oLoading.style.display = 'none';
						oLoadingText.innerHTML = oLt;
						var reText = JSON.parse(responseText);
						toast(reText.ResultMsg,2000);
					}else{
						oLoading.style.display = 'none'; 
						oLoadingText.innerHTML = oLt;
						var reText = JSON.parse(responseText); 
						toast(reText.ResultMsg,2000);
					}  
				}  
			}  
		}  
	}
	
	function yesPrize(num){
		 loadImg([ num+'.png','bg.jpg','prize.png'],true);
		 oRbg.src = 'images/bg.jpg';
		 oPrize.src = 'images/prize.png';
		 setH();
	}
	
	function notPrize(pic){
		 loadImg([pic],false);
		 oNoHasPrize.style.backgroundImage = 'url(images/'+pic+')';
		 oNoHasPrize.style.display = 'block';
		 setH();
	}
	
	function setH(){
		oSh = document.documentElement.scrollHeight || document.body.scrollHeight;
		oLh = oSh > oH ? oSh : oH;
		oLoading.style.height = oLh + 'px';	
	}
	
	function formatParams(data) {
		var arr = [];
		for (var name in data) {
			arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
		}
		return arr.join("&");
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