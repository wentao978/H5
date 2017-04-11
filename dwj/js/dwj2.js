$(document).ready(function(){
	var u = getQueryString('u');
	var s = getQueryString('s');
	
	var resData;
	var resLevel;
	var resCode;
	var resNumber;
	var levelArr = ["","s8","100","50","10","lb","jf"];
	/*端午节活动代码*/
	$("#bg").css({"width":$(window).width(),"height":$(window).height(),"max-width":640});
	
	//检测是不是移动设备
	var isMobile = true;
	var re = /android/gi;
	if(!re.test(navigator.userAgent)){
		isMobile = false;	
	};
				
	$.ajax({
		url: '/active/dwj/dwj.php',
		type: 'GET',
		dataType: 'json',
		timeout:60000,
		data:{
			u:u,
			s:s,
			type:"clicker"
		},
		success: function(data){
			resData = data;  //返回来的全部信息
			resLevel = data.level;  //奖品登记
			resCode = data.code;  //游戏礼包激活码
			resNumber = data.number; //剩余抽奖次数
			if(data.code){
				$("#copy").attr("data-clipboard-text",data.code);
			};
			loadImg();
			function loadImg() {
				var oLoading = document.getElementById('loading');
				var imgArr = ['images/topPic.png','images/loading.gif','images/nav.png','images/game.png','images/gp.png','images/7.png','images/qian.png','images/wen.png','images/yi.png'];
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

				goCanvas();
				
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
	
	
	
	function goCanvas(){
		/*canvas代码*/
		var oW = $("#c1").width();
		var oH = oW * 309/833;         
		var oImg = new Image();
		oImg.src = "images/7.png";
		var jinzhi = 0;
		
		var oImg4 = new Image();
		oImg4.src = "images/4.png";
		var oImg5 = new Image();
		oImg5.src = "images/5.png";
		var oImg6 = new Image();
		oImg6.src = "images/6.png";
		var oImg7 = new Image();
		oImg7.src = "images/7.png";
		
		oImg.onload = function(){
			
				
			var img = new Image(); 
			  
			if(resLevel){
				img.src = 'images/d_'+levelArr[resLevel]+'.jpg';  //中奖的图，即canvas背景图片  
			};
								 
			var oC = document.getElementById('c1');         
			var oGc = oC.getContext('2d');   
			
			oC.width = oW;             
			oC.height = oH; 
			
			img.onload = function(){
			
				var w = oW, h = oH;             
				var offsetX = oC.offsetLeft, offsetY = oC.offsetTop;                          
										 
				oC.width=w;             
				oC.height=h;             
				oC.style.backgroundImage='url('+img.src+')'; 
				oC.style.backgroundSize='cover';  
				oGc.shadowBlur = '3';
				oGc.shadowColor = 'white';
				
				oGc.drawImage(oImg,0,0,833,309,0,0,oW,oH);
							  
				oGc.globalCompositeOperation = 'destination-out';               
				
				var oT = false;	
				var mousedown = false;
				
				function eventDown(ev){                 
					ev.preventDefault();                 
					mousedown = true;
					if(parseInt(resNumber)){
						var x = ev.clientX || ev.changedTouches[0].pageX;
						var y = ev.clientY || ev.changedTouches[0].pageY;
						oGc.beginPath();
						oGc.moveTo(x - oC.getBoundingClientRect().left,y - oC.offsetTop - $(".gpWrap").offset().top + (isMobile ? 0 : $(document).scrollTop()));
					}else{
						toast("没机会了",2600);
						removeEvent(ev);	
					};            
				};   
				function eventUp(ev){               
					ev.preventDefault();                 
					mousedown = false;
					jinzhi = 1;
					var data=oGc.getImageData(0,0,w,h).data;
					for(var i=0,j=0;i<data.length;i+=4){
						if(data[i] && data[i+1] && data[i+2] && data[i+3]){
							j++;
						}
					}
					if((j<=w*h*0.9)){
						//j是剩余面积数
						// 剩余90%面积提示信息
						//alert("刮开面积大于10%，次数减一");		
						var iNow = 0;	
						var timer = null;	
						clearInterval(timer);		
						timer = setInterval(function(){
							if(iNow < 4){
								
								var oImger = new Image();						
								oImger.src = "images/"+(iNow+4)+".png";	
	
								oImger.onload = function(){
									oGc.drawImage(this,0,0,833,309,0,0,oW,oH);
																			
									iNow++;	
								};									
							}else{
								clearInterval(timer);
								var w = oW, h = oH;             
								
								oC.width=w;             
								oC.height=h;             
								
								oGc.drawImage(oImg,0,0,833,309,0,0,oW,oH);		  
								oGc.globalCompositeOperation = 'destination-out'; 
								
							};
						},80);
						
						setTimeout(function(){
							//canvas重置之后，再次发送一个请求
							$.ajax({
								url: '/active/dwj/dwj.php',
								type: 'GET',
								dataType: 'json',
								timeout:60000,
								data:{
									u:u,
									s:s,
									type:"click"
								},
								success: function(data){
									resData = data;  //返回来的全部信息
									resLevel = data.level;  //奖品登记
									resCode = data.code;  //游戏礼包激活码
									resNumber = data.number; //剩余抽奖次数
									
									goCanvas();
										
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
							}); //ajax请求结束								
							//重置canvas之后，在这里弹出框...
							if(resLevel){
								switch (resLevel){
									case "1":
										//s8
										$(".jdk,#mask").show();
										$(".jdk").find(".prize").attr("src","images/t_"+levelArr[resLevel]+".png");
									break;
									case "5":
										//礼包
										$(".yuebing,#mask").show();
										$(".yuebing").find(".prize").attr("src","images/t_lb.png");
										$(".yuebing").find(".text").html(resData.code);
										$(".yuebing").find(".copyWrap").attr("data-clipboard-text",resData.code);
									break;
									default :
										//出现积分的时候将滚动条设置到最顶端
										$('body,html').scrollTop(0);
										$(".chongzhi,#mask").show();
										$(".chongzhi").find(".prize").attr("src","images/t_"+levelArr[resLevel]+".png");
								};
							};
							
							
							
							
						},400);	
						
					};             
				};               
				function eventMove(ev){              
					ev.preventDefault();                 
					if(mousedown){                     
						var x = ev.clientX || ev.changedTouches[0].pageX;
						var y = ev.clientY || ev.changedTouches[0].pageY;
						//var ev = ev.targetTouches[0];
						oGc.lineTo(x - oC.getBoundingClientRect().left,y - oC.offsetTop - $(".gpWrap").offset().top + (isMobile ? 0 : $(document).scrollTop()));
						oGc.lineWidth = "15";
						oGc.lineCap = 'round';
						oGc.stroke();					
						//阻止页面的滚动
						jinzhi=0;						
						if(jinzhi==0){
							ev.preventDefault();
							ev.stopPropagation();
						};				
					};             
				}; 
							
				function removeEvent(ev){
					ev.preventDefault();
					//抬起的时候执行eventUp的事件
					eventUp(ev);
					oC.removeEventListener('mousemove',eventMove,false);
					oC.removeEventListener('touchmove',eventMove,false);
					oC.removeEventListener('mouseup',removeEvent,false);
					oC.removeEventListener('touchend',removeEvent,false);
				};
				
				function startMove(ev){
					ev.preventDefault();
					//按下的时候执行eventDown的事件
					eventDown(ev);
					oC.addEventListener('mousemove',eventMove,false);
					oC.addEventListener('touchmove',eventMove,false);
					oC.addEventListener('mouseup',removeEvent,false);
					oC.addEventListener('touchend',removeEvent,false)
				};
	
				oC.addEventListener('mousedown',startMove);
				oC.addEventListener('touchstart',startMove);
							
				
					
			};  //img onload
			
		};  //oImg  onload	
	};
	
	
	/*点击下载游戏按钮*/
	$(".downgame").each(function(index,element){
        $(element).click(function(){
			$.ajax({
				url: '/active/dwj/dwj.php',
				type: 'POST',
				dataType: 'json',
				timeout:15000,
				data: {
					u:u,
					s:s,
					id:$(element).data("id"),
					type:"load"
				},
				success: function(data,status,code){
					resData = data;
					/*if(data.save_status == "1"){
						resData = data;
						toast('保存成功',2600);
						$('.close-button').trigger('click');
					}else if(data.save_status == "0"){
						toast('保存失败',2600);
						$('.close-button').trigger('click');
					};*/				
				},
				error:function(jqXHR, textStatus, errorThrown){
					/*if(jqXHR.status == 400){
						toast('参数错误',2600);
					}else if(jqXHR.status == 401){
						toast('权限不足',2600);
					}else if(jqXHR.status == 500){
						toast('服务器繁忙',2600);
					};
					if(textStatus == 'timeout'){
						toast('请求超时',2600);
					};*/
				}
			});
		});
    });
	
	/*点击复制*/
	
	var copy = document.getElementById('copy');
    var clipboard = new Clipboard(copy);

    clipboard.on('success', function(e) {
		toast('复制成功',2600);
    });

    clipboard.on('error', function(e) {
       toast('复制失败',2600);
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
	
	/*点击修改*/
	$('.xiugai').click(function(){
		$('.addressInfo').hide();	
		$('.inAddressWrap').show();
		
		$('.inText').eq(0).val(resData.name);
		$('.inText').eq(1).val(resData.phone);
		$('.inText').eq(2).val(resData.address);
		
	});
	
	/*点击领取*/
	$('.get').on('click',function(){
		$(this).parent('div').hide();
		$('.inAddressWrap').show();	
	});
	
	/*确认收货*/
	var rePhone = /^\d{11}$/;
	$('.shaddress').find('.addressCon').click(function(){
		var flag = true;
		var mesgArr = ['请输入收货人','请输入联系方式','请输入详细地址'];
		$('.inText').each(function(index,element){
			if($(this).val() == ''){
				toast(mesgArr[index],2600);
				flag =  false;
			};
			if($('.formNum').val() != ''){
				if(!rePhone.test($('.formNum').val())){
					toast('输入正确的手机号格式',2600);
					flag = false;
				};
			};
		});
		if(flag){
			$('.load').show();
			$.ajax({
				url: 'http://10.8.8.141/game/getRead.do',
				type: 'POST',
				dataType: 'json',
				timeout:15000,
				data: {
					u:u,
					s:s,
					n:$('.inText').eq(0).val(),
					ph:$('.inText').eq(1).val(),
					a:$('.inText').eq(2).val(),
					type:"save"
				},
				success: function(data,status,code){
					resData = data;
					if(data.save_status == "1"){
						resData = data;
						toast('保存成功',2600);
						$('.close-button').trigger('click');
					}else if(data.save_status == "0"){
						toast('保存失败',2600);
						$('.close-button').trigger('click');
					};	
					$('.load').hide();				
				},
				error:function(jqXHR, textStatus, errorThrown){
					$('.load').hide();
					if(jqXHR.status == 400){
						toast('参数错误',2600);
					}else if(jqXHR.status == 401){
						toast('权限不足',2600);
					}else if(jqXHR.status == 500){
						toast('服务器繁忙',2600);
					};
					if(textStatus == 'timeout'){
						toast('请求超时',2600);
					};
				}
			});
			
		}
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
				url: '/lockimage/updateAddr.do',
				type: 'POST',
				dataType: 'json',
				timeout:15000,
				data: {
					u:u,
					s:s,
					type:"save"
				},
				success: function(data,status,code){
					if(data.save_status == "1"){
						toast('保存成功',2600);
						$('.close-button').trigger('click');
						yesHb = true;
					}else if(data.save_status == "0"){
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