$(document).ready(function(){
	//var uid = getQueryString('imei');
	//var s = getQueryString('s');
	
	window.localStorage.getItem("music_imei") == null ? window.localStorage.setItem("music_imei",getQueryString('imei')): "" ;
	window.localStorage.getItem("music_s") == null ? window.localStorage.setItem("music_s",getQueryString('s')): "";
	
	var uid = window.localStorage.getItem("music_imei") == null ? getQueryString('imei') : window.localStorage.getItem("music_imei");
	var s = window.localStorage.getItem("music_s") == null ? getQueryString('s') : window.localStorage.getItem("music_s");
	
	
	var resData;
	var resLevel;
	var resNumber;
	
	var num = 0;
	var oBtn = true;
	var pLevel = 0;
	var textArr = ["","随车听一个","头戴降噪耳机一个","100元京东购物卡一个","鸡年公仔一个","黄金生肖鸡一个","手机支架一个","QQ会员","20元红包一个"];
	
	String.prototype.iphone = function(){
		return this.replace(/\d{1}(?=[\d\D]{4,7}$)/ig,"<span class='xing'>*</span>")
	};
			
	//获取滚动显示的
	$.ajax({
		url: '/active/myear2017/elevendaylist.php',
		type: 'GET',
		dataType: 'json',
		timeout:60000,
		success: function(data){
			if(data.list.length){
				$(".notify,.scrollDiv").show();
				//绘制滚动显示
				var prizeHtml = '';
				for(var i = 0; i<data.list.length;i++){
					prizeHtml += '<li>·&nbsp;恭喜用户：<span>'+data.list[i].split(" ")[0].iphone()+'</span>&nbsp;获得<span>'+textArr[parseInt(data.list[i].split(" ")[1])]+'</span></li>';
				}
				$('#scrollDiv').find('ul').html(prizeHtml);
				
				/*左下角滚动*/
				var oUl = $('#scrollDiv').find('ul');
				var aLi = oUl.children('li');
				var H = aLi.eq(0).height();
				var iNow = 0;
				var iNow2 = 0;
				if(data.list.length > 1){
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
				}
				
			};
		},
		error: function(){}
	});
	
	//点击活动规则
	$(".rule").click(function(){
		if(oBtn){
			$('#toast').hide();
			$(".rules,#mask").show();
		}
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
	
	//ento page 
	$.ajax({
		url: '/active/eleven/search.php',
		type: 'POST',
		dataType: 'json',
		timeout:60000,
		data:{
			uid:uid,
			s:s,
			gameid:'0'
		},
		success: function(){},
		error: function(){}
	});
	
	$.ajax({
		url: '/active/myear2017/search.php',
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
				//$(".time").html(data.number);
				
				$(".tongWrap .img").bind("click",doSome);
				
				//$("#down").html(""+window.DeviceMotionEvent);
				if (window.DeviceMotionEvent) {
					window.addEventListener('devicemotion', deviceMotionHandler, false);
				} else {
					alert('本设备不支持devicemotion事件');
				}
				var SHAKE_THRESHOLD = 800;
				var last_update = 0;
				var x = y = z = last_x = last_y = last_z = 0;
				var shake = true;
				
				function deviceMotionHandler(eventData) {
					var acceleration = eventData.accelerationIncludingGravity;
					var curTime = new Date().getTime();
			
					if ((curTime - last_update) > 100) {
						var diffTime = curTime - last_update;
						last_update = curTime;
						x = acceleration.x;
						y = acceleration.y;
						z = acceleration.z;
						var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
			
						if ( (speed > SHAKE_THRESHOLD) && shake) {
							//$("#down").html("摇了"+num+++"次");
							doSome();
							setTimeout(function(){
								shake = true;
							},2000);	
						}
						last_x = x;
						last_y = y;
						last_z = z;
					}
				}

				
				
				function doSome(){
					$('#toast').hide();
					if(oBtn){
						oBtn = false;
						shake = false;
						
						setTimeout(function(){
							shake = true;
						},2000);
						
						if(parseInt(resNumber) > 0){
							$(".tongWrap,.dropWrap1,.dropWrap2,.dropWrap3").addClass("active");
							//发送请求
							$.ajax({
								url: '/active/myear2017/click.php',
								type: 'GET',
								dataType: 'json',
								timeout:60000,
								data:{
									uid:uid,
									s:s,
									type:"click"
								},
								success: function(data){
									pLevel = data.level;
									data.level != "0" ? resLevel = data.level : "";
									console.log(resLevel);
									resNumber = data.number;
									oBtn = true;
								},
								error: function(jqXHR, textStatus, errorThrown){
									oBtn = true;
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
							setTimeout(function(){
								console.log(pLevel);
								$(".qianWrap,#mask").show();
								$(".tongWrap,.dropWrap1,.dropWrap2,.dropWrap3").removeClass("active");								
								if(pLevel > 0){
									$(".qianWrap").find(".q").addClass("active").attr("src","images/q_"+pLevel+".png");
									$(".qianWrap").find(".qbtn").attr("src","images/lq.png");
								}else{
									var ct = Random(9,14);
									$(".qianWrap").find(".q").addClass("active").attr("src","images/q_"+ct+".png");									
								}
								$(".qianWrap").find(".qbtn").click(function(){
									$(".qianWrap").hide();
									switch (parseInt(pLevel)) {
										case 1:
										case 2:
										case 3:
										case 4:
										case 5:
										case 6:
											//地址
											$(".lingqu").show();
											$(".lingqu").find(".prize").attr("src","images/l_"+pLevel+".png");
										break;
										case 7:
										case 8:
											//手机号码
											$(".chongzhi").show();
											$(".chongzhi").find(".prize").attr("src","images/l_"+pLevel+".png");
											
										break;
										case 0:
											//签
											var cp = Random(ct);
											$(".jieqianWrap").show(function(){
												$(document).on("click",function(){
													$(".jieqianWrap").attr("close",true);
													if(!$(".jieqianWrap").is(":hidden") && $(".jieqianWrap").attr("close")){
														$(".jieqianWrap,#mask").hide();
													}
												});	
											});
											
											$(".jieqianWrap").find(".jq").attr("src","images/jq_"+cp+".jpg");
										break;
									}		
								});
							},3000);	
						}else{
							oBtn = true;
							toast('您今天的抽奖机会用完了',2600);
						}	
					}
					
				};
				
				/*点击中奖纪录*/
				$(".record").click(function(){
					if(oBtn){
						$('#toast').hide();
						switch (parseInt(resLevel)){
							case 0:
								toast('您还没有中奖纪录',2600);
							break;
							case 1:  //地址
							case 2:
							case 3:
							case 4:
							case 5:
							case 6:
								$("#mask,.shouhuoWrap").show();
								$(".shouhuoWrap").find(".prizeImg").attr("src","images/l_"+resLevel+".png");
								$('.addressInfo').find('.nameInfo').html(resData.name);
								$('.addressInfo').find('.phoneInfo').html(resData.phone);
								$('.addressInfo').find('.addrInfo').html(resData.adrs);
							break;
							case 7:  //手机号
							case 8:
								$("#mask,.chongzhi").show();
								$(".hongbaoForm").hide();
								$(".hasHongbao").show();
								$(".inaddress").eq(0).hide();
								$(".inaddress").eq(1).show();
								$(".hasNum").html(resData.phone);
								$(".chongzhi").find(".prize").attr("src","images/l_"+resLevel+".png");
							break;								
						};
					};
				});
				
				
			}else if(data.st == "3"){
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
	
	/*输入框获取焦点时上移*/
	$('.phoneNum').focus(function(){		
		$(".chongzhi").css("transform","translate3d(-50%,-75%,0)");	
	}).blur(function(){
		$(".chongzhi").css("transform","translate3d(-50%,-50%,0)");
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
				$('.load').show();
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
	
	/*function getQueryString(name){
		var qs = location.search.length > 0 ? location.search.substring(1) : '' ,items = qs.length ? qs.split('&') : [] , item = null , i = 0 , len = items.length;	
		for(i=0;i<len;i++){
			item = items[i].split('=');
			if(decodeURIComponent(item[0]) == name){
				return decodeURIComponent(item[1]);
			};
		};
	};*/
	
	function getQueryString(name){
		var qs = location.search.length > 0 ? location.search.substring(1) : '' ,items = qs.length ? qs.split('@') : [] , item = null , i = 0 , len = items.length;	
		for(i=0;i<len;i++){
			item = items[i].split('=');
			if(decodeURIComponent(item[0]) == name){
				return decodeURIComponent(item[1]);
			};
		};
	};
	
	function Random(s,e){
		if(arguments.length == 1){
			var p = arguments[0];
			switch (p) {
				case 9:
					return Random(1,4);
				break;
				case 10:
					return Random(4,6);
				break;
				case 11:
					return Random(6,8);
				break;
				case 12:
					return Random(8,10);
				break;
				case 13:
					return Random(10,11);
				break;
			} 
		}else{
			return Math.floor(Math.random()*(e-s)+s);	
		}
	};
	
	function scrollHandler () {
		if( $(window).scrollTop() >=  ($("#content").height() - $(window).height() - 10) ){
			$("#down").stop(true,false).animate({textIndent:0},{step: function(now,fx){
				$(this).css('-webkit-transform','translateX(-100%)'); 
			},duration:'slow'},'swing');
		}else{
			$("#down").stop(true,false).animate({textIndent:0},{step: function(now,fx){ 
				$(this).css('-webkit-transform','translateX(0%)'); 
			},duration:'slow'},'swing');
		}	
	}
	
	
	$(document).on("scroll",function(){
		window.requestAnimationFrame(scrollHandler);
	});
	
});