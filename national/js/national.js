$(document).ready(function(){
	var u = getQueryString('u');
	var s = getQueryString('s');
	
	var resData;
	var resLevel;
	var resCode;
	var resStatus;
	
	var num = 0;
	var moveLeft = ["8.5rem","10.5rem","12.5rem"];
	var staticLeft = ["1.2rem","8.2rem","12.5rem"];
	var oBtn = true;
	var textArr = ["","金立M6手机一部","100元京东卡一张","30元移动充值卡一张","10元京东卡一张","蚂蜂窝50元的抵价劵一张"];
	
	String.prototype.iphone = function(){
		return this.replace(/\d{1}(?=[\d\D]{4,7}$)/ig,"<span class='xing'>*</span>")
	};
	
		
	//获取滚动显示的
	$.ajax({
		url: '/active/national/nationaldaylist.php',
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
				url: '/active/national/search.php',
				type: 'POST',
				dataType: 'json',
				timeout:60000,
				data:{
					uid:u,
					s:s,
					gameid:$(this).find("img").data("id")
				},
				success: function(){},
				error: function(){}
			});
		});
    });
	

	$.ajax({
		url: '/active/national/search.php',
		type: 'GET',
		dataType: 'json',
		timeout:60000,
		data:{
			u:u,
			s:s,
			type:"search"
		},
		success: function(data){
			resData = data;
			resLevel = data.level;
			resCode = data.code;
			resStatus = data.status;
			
			if(data.st == "2"){  //活动正常
				$(".time").html(data.number);
				$(".egg").each(function(index,element){
                    
					$(element).click(function(){
						if(oBtn && !$(element).hasClass("active")){
							oBtn = false;
							//点击的时候判断一下点击次数
							if(parseInt(resData.number) > 0){
								//有剩余次数，点击的时候开始发送请求
								$.ajax({
									url: '/active/national/click.php',
									type: 'POST',
									dataType: 'json',
									timeout:60000,
									data:{
										u:u,
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
								toast('您今天的砸蛋次数用完了',2600);	
							};
						};
					});
					
                });
				
				/*点击中奖纪录*/
				$(".record").click(function(){
					
					if(oBtn){
						
						if(resLevel == "0"){
							toast('您还没有中奖纪录',2600);
						}else{
							switch (resLevel){
								case "5":  //蚂蜂窝
									$("#mask,.yuebing").show();
									$(".yuebing").find(".prize").attr("src","images/5.png");
								break;
								case "4":  //10京东卡
								case "3":  //30京东卡
								case "2":  //100京东卡	
									document.body.scrollTop = 0;
									$("#mask,.chongzhi").show();
									$(".hongbaoForm").hide();
									$(".hasHongbao").show();
									$(".inaddress").eq(0).hide();
									$(".inaddress").eq(1).show();
									$(".hasNum").html(resData.phone);
									$(".chongzhi").find(".prize").attr("src","images/"+resLevel+".png");
								break;
								case "1":  //M6手机
									$("#mask,.shouhuoWrap").show();
									$(".shouhuoWrap").find(".prizeImg").attr("src","images/phone.png");
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
		$(".egg").removeClass("active");
		$(".hammerDiv").show().css({"left":"12.5rem","top":"10.2rem"});
				
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
	var rePhone = /^\d{11}$/;
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
					url: '/active/national/save.php',
					type: 'POST',
					dataType: 'json',
					timeout:15000,
					data: {
						u:u,
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
				url: '/active/national/save.php',
				type: 'POST',
				dataType: 'json',
				timeout:15000,
				data: {
					u:u,
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