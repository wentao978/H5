$(document).ready(function(){
	var u = getQueryString('u');
	var s = getQueryString('s');
	
	var resData;
	var resNumber;
	
	/*抢红包活动代码*/
	$("body,.bgWrap,.content").css({"width":$(window).width(),"height":$(window).height(),"max-width":640});
	setInterval(function(){
		for(var i=0,len=1;i<len;i++){
		    $(".content").append("<div class='box run ' style='left:"+(Math.random()*12 + 1)+"em;top:3em'></div>");
		};	
		
	   $(".box.run").each(function(index,element){
           if(!$(this).is(":animated")){
			  $(this).animate({'top':$(window).height()},3000,"linear");   
		   }
   	   });
       
	   $(".box.run").each(function(index,element){
			if(parseInt($(this).css("top")) >= $(window).height()){
				$(this).remove();
			};
		});
       
	},500);
	
				
	$.ajax({
		url: '/active/envelope/envelope.php',
		type: 'GET',
		dataType: 'json',
		timeout:60000,
		data:{
			u:u,
			s:s,
			type:"query"
		},
		success: function(data){
			resData = data;  //返回来的全部信息
			resNumber = data.n; //剩余抽奖次数
			
			loadImg();
			function loadImg() {
				var oLoading = document.getElementById('loading');
				var imgArr = ['images/bg.jpg','images/loading.gif','images/flower.png','images/no.png','images/normal.png','images/open.png','images/pity.png','images/top.png','images/close-button.png'];
				var num = 0;		
				for(var i=0;i<imgArr.length;i++){
					var Img = new Image();
					Img.src = imgArr[i];
					Img.onload = function(){
						num++;
						if(num == imgArr.length){
							oLoading.style.display = 'none';
						};
					};
					Img.onerror = function(){
						oLoading.style.display = 'none';
					};
				};
			};
		
			if(data.st == "1"){
				document.onclick = function(){
					toast('活动未开始',2600);
				};
			}else if(data.st == "3"){  //活动正常

				setInterval(function(){
					$("body").find(".box").off("click").on("click",function(){
						if(!$(this).hasClass("open")){
							
							if(resNumber < 5){
								$(this).addClass("open");
								$(this).removeClass("run");
								$(this).stop(true,false);
								$(this).append("<img src='images/flower.png' style='width:150%; position:relative; top:-23%; left:-23%;'>");
								var _this = $(this);
								setTimeout(function(){
									_this.remove();
								},1000);
								$.ajax({
									url: '/active/envelope/envelope.php',
									type: 'GET',
									dataType: 'json',
									timeout:60000,
									data:{
										u:u,
										s:s,
										type:"click"
									},
									success: function(data){
										if(data.st == "1"){
											toast('活动未开始',2600);
										}else if(data.st == "2"){
											toast('活动结束',2600);
										}else{//活动正常，开始判断
											
											if(data.n > 5){//没机会了
												console.log("没机会了");
											}else{//可以正常抽奖
												
												if(data.p == "1"){ //中奖了
													console.log("中奖了");
												}else{//没中奖
													console.log("没中奖");
												};
												
											};
											
										};
									},
									error:function(jqXHR, textStatus, errorThrown){
										if(jqXHR.status == 400){
											toast('参数错误',2600);
										}else if(jqXHR.status == 401){
											toast('权限不足',2600);
										}else if(jqXHR.status == 500){
											toast('服务器繁忙',2600);
										};
										if(textStatus == 'timeout'){
											toast('请求超时',2600);
										}
									}
								});
							}else{//没机会了
								console.log("没机会了");
							};	
							
							
						};	
					});
				},500);
				
			}else if(data.st == "2"){
				document.onclick = function(){
					toast('活动结束',2600);
				};
			};	
		},
		error:function(jqXHR, textStatus, errorThrown){
			$('#loading').hide();
			if(jqXHR.status == 400){
				toast('参数错误',2600);
			}else if(jqXHR.status == 401){
				toast('权限不足',2600);
			}else if(jqXHR.status == 500){
				toast('服务器繁忙',2600);
			};
			if(textStatus == 'timeout'){
				toast('请求超时',2600);
			}
			document.onclick = function(){
				toast('数据异常',2600);
			};
		}
	});
	
	
	/***********关闭按钮***********/
	$('.close-button').click(function(){
		
		$(this).parent('div').hide();
		$('#mask').hide();
		
		clearInput($(this),'.formNum');
		clearInput($(this),'.formPerson');
		clearInput($(this),'.formAddress');	
		clearInput($(this),'.phoneNum');
	});
	
	
	//只有手机号的情况
	var rePhone = /^\d{11}$/;
	$('.phoneCon').click(function(){
		if(!rePhone.test($('.phoneNum').val())){
			toast('请输入正确的手机号码',2600);
			return;
		}else{
			usePhoneNum = $('.phoneNum').val();
			$('.load').show();
			$.ajax({
				url: '/active/envelope/envelope.php',
				type: 'POST',
				dataType: 'json',
				timeout:15000,
				data: {
					u:u,
					s:s,
					ph:usePhoneNum,
					type:"save"
				},
				success: function(data,status,code){
					if(data.status == "1"){
						toast('保存成功',2600);
						$('.close-button').trigger('click');
					}else if(data.status == "0"){
						toast('保存失败',2600);
						$('.close-button').trigger('click');
					};	
					$('.load').hide();				
				},
				error:function(jqXHR, textStatus, errorThrown){
					$('.load').hide();
					if(jqXHR.status == 400){
						toast('参数错误',2600);
					}else if(jqXHR.status == 500){
						toast('服务器繁忙',2600);
					};
					if(textStatus == 'timeout'){
						toast('请求超时',2600);
					};
				}
			});	
		};	
	});
	
	function toast(msg,time){
		var oT = document.getElementById('toast');
		if(!oT){
			var oDiv = document.createElement('div');
			oDiv.className = 'animated-slow fadeIn toast';
			oDiv.id = 'toast';
			oDiv.innerHTML = msg;
			document.body.appendChild(oDiv);
			setTimeout(function(){
				document.body.removeChild(oDiv);	
			},time);	
		};
	};
	
	function clearInput(_this,obj){
		if(_this.parent('div').find(obj).val() != ''){
			_this.parent('div').find(obj).val('');	
		};
	};
	
	function getQueryString(name){
		var qs = location.search.length > 0 ? location.search.substring(1) : '' ,items = qs.length ? qs.split('&') : [] , item = null , i = 0 , len = items.length;	
		for(i=0;i<len;i++){
			item = items[i].split('=');
			if(decodeURIComponent(item[0]) == name){
				return decodeURIComponent(item[1]);
			};
		};
	};
});