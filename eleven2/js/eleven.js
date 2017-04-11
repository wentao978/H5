$(document).ready(function(){
	var uid = getQueryString('imei');
	var s = getQueryString('s');
	
	var resData;
	var resLevel;
	var resCode;
	var resStatus;
	var resNumber = 3;
	
	var num = 0;
	var moveLeft = ["8.5rem","10.5rem","12.5rem"];
	var staticLeft = ["1.2rem","8.2rem","12.5rem"];
	var oBtn = true;
	var textArr = ["","金立M6手机一部","100元京东卡一张","30元移动充值卡一张","10元京东卡一张","蚂蜂窝50元的抵价劵一张"];
	
	String.prototype.iphone = function(){
		return this.replace(/\d{1}(?=[\d\D]{4,7}$)/ig,"<span class='xing'>*</span>")
	};
	
	
	var topArr = ["0rem","-3.91rem","-7.83rem","-11.64rem"];
	var pLevel = 0;
	
	var dhtml = $(".dl").eq(0).html();
	//点击滚动奖品
	var odl=$(".dl"); 
           
	for(var i=0; i<odl.length; i++){  
		var html=odl[i].innerHTML;  
		odl[i].innerHTML="";  
		ck=stradd(html,3);  
		odl[i].innerHTML=ck;  
	 };   
   
    var oneHeight = $("li").height()*4;
	
	$(".dl").find("img").css("height",oneHeight/4);
	$(".dl").find("dd").css("height",oneHeight/4);
	
	var timer = null;
	var iSpeed=2,size=0;
	
	var iCur1 = 0;
	var iCur2 = 0;
	var iCur3 = 0;
	
	var random1 = Math.floor(Math.random()*4+1); 
	var random2 = Math.floor(Math.random()*4+1); 
	var random3 = Math.floor(Math.random()*4+1); 
	
	iCur1 = 7*oneHeight;
	iCur2 = 7*oneHeight;
	iCur3 = 7*oneHeight;
	var t1 ,t2;
	
	
	function move(){
		if(new Date().getTime() - t1 > 5400){
			window.cancelAnimationFrame(timer);
			console.log(iCur1,iCur2,iCur3);	
			iCur1 = 0;	
			iCur2 = 0;	
			iCur3 = 0;			
		}else{
			$(".dl").eq(0).css("WebkitTransform","translateY(-"+iCur1+"px)");
			$(".dl").eq(1).css("WebkitTransform","translateY(-"+iCur2+"px)");
			$(".dl").eq(2).css("WebkitTransform","translateY(-"+iCur3+"px)");
			requestAnimationFrame(move);
			console.log("1:"+iCur1);
			console.log("2:"+iCur2);
			console.log("3:"+iCur3);
		};
		
	}
		
	//获取滚动显示的
	$.ajax({
		url: '/active/eleven/elevendaylist.php',
		type: 'GET',
		dataType: 'json',
		timeout:60000,
		success: function(data){
			if(data.list.length){
				$(".notify,.scrollDiv").show();
				//绘制滚动显示
				var prizeHtml = '';
				for(var i = 0; i<data.list.length;i++){
					prizeHtml += '<li>恭喜<span>'+data.list[i].split(" ")[0].iphone()+'</span>&nbsp;获得<span>'+textArr[parseInt(data.list[i].split(" ")[1])]+'</span></li>';
				}
				$('#scrollDiv').find('ul').html(prizeHtml);
				
				/*左下角滚动*/
				var oUl = $('#scrollDiv').find('ul');
				var aLi = oUl.children('li');
				var H = aLi.eq(0).height();
				var iNow = 0;
				var iNow2 = 0;
				setInterval(function(){
					if(iNow == 0){
						aLi.eq(0).css('position','static');
						oUl.css('top','0');
						iNow2 = 0;
					};
					if(iNow == aLi.length -1 ){
						iNow = 0;
						aLi.eq(0).css('position','relative').css('top',aLi.length*H);
					}else{
						iNow++;
					};
					iNow2++;
					oUl.animate({top:-H*iNow2}, 1000);
				}, 4000);
				
			};
		},
		error: function(){}
	});
	
	//点击活动规则
	$(".rule").click(function(){
		$(".rules,#mask").show();	
	});
	
	//点击赞助链接
	$(".apk").each(function(index, element) {
        $(this).click(function(){
			window.location.href = $(this).find("img").data("href");
			$.ajax({
				url: '/active/eleven/search.php',
				type: 'POST',
				dataType: 'json',
				timeout:60000,
				data:{
					uid:uid,
					s:s,
					gameid:$(this).find("img").data("id")
				},
				success: function(){},
				error: function(){}
			});
		});
    });
	
	
	$(".btn").click(function(){
		
					if(oBtn){
						oBtn = false;
						if(parseInt(resNumber)){
							t1 = new Date().getTime();
							iCur1 = 7*oneHeight;
							iCur2 = 7*oneHeight;
							iCur3 = 7*oneHeight;
							
							random1 = Math.floor(Math.random()*4+1); 
							random2 = Math.floor(Math.random()*4+1); 
							random3 = Math.floor(Math.random()*4+1); 
							
							if( (random1 == "2" && random2 == "3" && random3 == "4") || (random1 == "3" && random2 == "2" && random3 == "3") || (random1 == "4" && random2 == "4" && random3 == "2") || ((random1 == "1" && random2 == "1" && random3 == "1")) ){
								random1 = 3;
								random2 = 4;
								random3 = 1;
							}
							
							//模拟ajax请求延迟
							iCur1 = 7*oneHeight + (random1-1)*oneHeight/4;
							iCur2 = 7*oneHeight + (random2-1)*oneHeight/4;
							iCur3 = 7*oneHeight + (random3-1)*oneHeight/4;
							$(".ganWrap").css("WebkitTransform","rotateX(160deg)");		
							setTimeout(function(){
								$(".ganWrap").css("WebkitTransform","rotateX(0deg)");			
							},700);
							
							
							$(".dl").eq(0).css("transition-duration","5000ms");
							$(".dl").eq(1).css("transition-duration","5200ms");
							$(".dl").eq(2).css("transition-duration","5400ms");	
							
							timer = requestAnimationFrame(move);	
							
							setTimeout(function(){
								$(".dl").eq(0).css("transition-duration","0ms");
								$(".dl").eq(1).css("transition-duration","0ms");
								$(".dl").eq(2).css("transition-duration","0ms");
		
								
								switch (resLevel){
									case "3":  //30元移动充值卡
										document.body.scrollTop = 0;													
										$("#mask,.chongzhi").show();
										$(".hongbaoForm").show();
										$(".hasHongbao").hide();
										$(".inaddress").eq(0).show();
										$(".inaddress").eq(1).hide();
										$(".chongzhi").find(".prize").attr("src","images/p_"+resLevel+".png");
										
										//$(".dl").css("WebkitTransform","translateY(0px");	
										oBtn = true;
										
									break;
									case "2":  //喜马拉雅耳机
									case "1":  //M6手机													
										$("#mask,.jdk").show();
										$(".jdk").find(".prize").attr("src","images/p_"+resLevel+".png");
										
										//$(".dl").css("WebkitTransform","translateY(0px");	
										oBtn = true;
										
									break;
									case "0":  //没中奖
										
										setTimeout(function(){
											$(".dl").css("WebkitTransform","translateY(0px");	
											oBtn = true;
										},2000);
									
										setTimeout(function(){
											toast("很遗憾，没有中奖",2600);	
										},100);
										
									break;							
								};
								
								//如果中奖，弹出中奖的框，再重置为0
								
								
															
							},5400);
								
						}else{
							oBtn = true;
							toast('您的摇杆次数用完了',2600);
						}	
					}
					
				});
	
	$.ajax({
		//url: '/active/eleven/search.php',
		type: 'GET',
		dataType: 'json',
		timeout:60000,
		data:{
			uid:uid,
			s:s,
			type:"search"
		},
		success: function(data){
			resData = data;
			resLevel = data.level;
			resCode = data.code;
			resStatus = data.status;
			resNumber = data.number;
			
			if(data.st == "2"){  //活动正常
				$(".time").html(data.number);
				/*$(".egg").each(function(index,element){
                    
					$(element).click(function(){
						if(oBtn && !$(element).hasClass("active")){
							oBtn = false;
							//点击的时候判断一下点击次数
							if(parseInt(resData.number) > 0){
								//有剩余次数，点击的时候开始发送请求
								$.ajax({
									url: '/active/eleven/click.php',
									type: 'POST',
									dataType: 'json',
									timeout:60000,
									data:{
										uid:uid,
										s:s,
										type:"click"
									},
									success: function(data){
										$(".time").html(data.number);
										//先运动到一个位置
										$(".hammerDiv").css({"top":"9.2rem","left":moveLeft[index]});
										//再做一个animate
										$(".hammerDiv").animate({"top":"12.4rem","left":staticLeft[index]},100,function(){
											$(element).addClass("active").siblings().removeClass("active");
											$(".hammerDiv").hide();
											
											//运动结束在这里根据中奖等级显示中奖结果
											if(data.level != "0"){
												resLevel = data.level;
											};
											setTimeout(function(){
												oBtn = true;
												switch (resLevel){
													case "5":  //蚂蜂窝券
														$("#mask,.yuebing").show();
														$(".yuebing").find(".prize").attr("src","images/5.png");
													break;
													case "4":  //10元京东卡
													case "3":  //30元移动充值卡
													case "2":  //100元京东卡
														document.body.scrollTop = 0;													
														$("#mask,.chongzhi").show();
														$(".hongbaoForm").show();
														$(".hasHongbao").hide();
														$(".inaddress").eq(0).show();
														$(".inaddress").eq(1).hide();
														$(".chongzhi").find(".prize").attr("src","images/"+resLevel+".png");
													break;
													case "1":  //M6手机													
														$("#mask,.jdk").show();
														$(".jdk").find(".prize").attr("src","images/phone.png");
													break;
													case "0":  //没中奖
														var no = null;
														$(".success,#mask").click(function(){
															clearTimeout(no);
															$(".egg").removeClass("active");
															$(".hammerDiv").show().css({"left":"12.5rem","top":"10.2rem"});
															$('.success,#mask').hide();		
														});
														$('.success,#mask').stop(true,false).fadeIn('100',function(){//没有中奖
															clearTimeout(no);
															no = setTimeout(function(){
																$(".egg").removeClass("active");
																$(".hammerDiv").show().css({"left":"12.5rem","top":"10.2rem"});
																$('.success,#mask').fadeOut('200');	
															},1500);
														});
														
														
													break;							
												};	
											},100);
											
										});
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
										};
									}
								});
								//...
							}else{
								toast('您今天的摇杆次数用完了',2600);	
							};
						};
					});
					
                });*/
				
				
				
				/*点击中奖纪录*/
				$(".record").click(function(){
					if(oBtn){
						if(resLevel == "0"){
							toast('您还没有中奖纪录',2600);
						}else{
							switch (resLevel){
								case "3":  //50元红包
									document.body.scrollTop = 0;
									$("#mask,.chongzhi").show();
									$(".hongbaoForm").hide();
									$(".hasHongbao").show();
									$(".inaddress").eq(0).hide();
									$(".inaddress").eq(1).show();
									$(".hasNum").html(resData.phone);
									$(".chongzhi").find(".prize").attr("src","images/p_"+resLevel+".png");
								break;
								case "2":  //喜马拉雅耳机
								case "1":  //M6手机
									$("#mask,.shouhuoWrap").show();
									$(".shouhuoWrap").find(".prizeImg").attr("src","images/p_"+resLevel+".png");
									$('.addressInfo').find('.nameInfo').html(resData.name);
									$('.addressInfo').find('.phoneInfo').html(resData.phone);
									$('.addressInfo').find('.addrInfo').html(resData.adrs);
								break;
								
							};	
						};
						
					};
				});
				
				
			}else if(data.st == "3"){
				$(".time").html("0");
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
				
		$(".dl").css("WebkitTransform","translateY(0px");
				
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
		$('.inText').eq(2).val(resData.adrs);
		
	});
	var rePhone = /^1[3|5|7|8][0-9]\d{8}$/;
	//只填写手机号点击确定
	$(".phoneCon").click(function(){
		if($(this).val() == ''){
			toast('请输入手机号',2600);
			return;
		}else{
			if(!rePhone.test($(".phoneNum").val())){
				toast('输入正确的手机号格式',2600);
				return;
			}else{
				$.ajax({
					url: '/active/eleven/save.php',
					type: 'POST',
					dataType: 'json',
					timeout:15000,
					data: {
						uid:uid,
						s:s,
						phone:$('.phoneNum').val(),
						type:"save"
					},
					success: function(data,status,code){
						resData = data;
						switch (code.status){
							case 200 :
								if(data.RsMassage == "1"){
									resData = data;
									toast('保存成功',2600);
									$('.close-button').trigger('click');
								}else if(data.RsMassage == "0"){
									toast('保存失败',2600);
									$('.close-button').trigger('click');
								};
							break;
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
						}
					}
				});
			};	
		};
	});
	
	/*点击领取*/
	$('.get').on('click',function(){
		$(this).parent('div').hide();
		$('.inAddressWrap').show();	
	});
	
	/*确认收货*/
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
				url: '/active/eleven/save.php',
				type: 'POST',
				dataType: 'json',
				timeout:15000,
				data: {
					uid:uid,
					s:s,
					name:$('.inText').eq(0).val(),
					phone:$('.inText').eq(1).val(),
					adrs:$('.inText').eq(2).val(),
					type:"save"
				},
				success: function(data,status,code){
					resData = data;
					
					switch (code.status){
						case 200 :
							if(data.RsMassage == "1"){
								resData = data;
								toast('保存成功',2600);
								$('.close-button').trigger('click');
							}else if(data.RsMassage == "0"){
								toast('保存失败',2600);
								$('.close-button').trigger('click');
							};
						break;
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
					}
				}
			});
			
		}
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
	
	function stradd(str,size){  
		if(Object.prototype.toString.call(str) == "[object String]"){  
			for (var i = 0; i < size; i++) {  
				str+=str;  
			};   
		}else{  
			return "数据类型错误";  
		}  
		 return str;  
	}  
	
	 //requestAnimationFrame方法
	(function() {
		var lastTime = 0;
		var vendors = ["ms", "moz", "webkit", "o"];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x){
			window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
			window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
		};
		if(!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element){
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function(){
				callback(currTime + timeToCall);
			},timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
		if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}());
	
});