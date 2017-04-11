$(document).ready(function(){
	var u = getQueryString('u');
	var s = getQueryString('s');
	
	var resData;
	var resLevel;
	var resCode;
	var resStatus;
	var isGo = false;
	
	$('#dowebok').fullpage({afterLoad: function(anchorLink, index){if(index == 4){$("#arrow").hide()}else{$("#arrow").show()}},scrollOverflow:true,verticalCentered:false,css3:true});
	
	
	$(".phoneNum").focus(function(){
		$(".chongzhi").css("top","-6em");
	}).blur(function(){
		$(".chongzhi").css("top","0");
	});
	
	//$(".section4,.section4 .fp-tableCell").css("height","auto");
	
	var timer1 = null;
	var num = 0;
	
	function go(){
		for(var i=0,len=1;i<len;i++){
		    $(".section3").append("<div class='box run' style='left:"+(Math.random()*12 + 1)+"em;top:8em'></div>");
		};	
		
		$(".box").off("click").on("click",function(){
			if(!$(this).hasClass("open")){
				$(this).addClass("open");
				$(this).removeClass("run");
				$(this).stop(true,false);
				num++;
				console.log(num);
				$(".numWrap").html(num);
				$(this).append("<img src='images/addone.png' class='addone' style=' position:relative; top:0; left:53%;'>");
				var _this = $(this);
				setTimeout(function(){
					_this.remove();
				},1000);
				if(num >= 10){
					isGo = true;
					$(".passWrap,.boxes").show();
				};
				
			};	
		});
		
	   $(".box.run").each(function(index,element){
           if(!$(this).is(":animated")){
			  $(this).animate({'top':$(window).height()},(index+1)*1000,"linear");   
		   }
   	   });
       
	   $(".box.run").each(function(index,element){
			if(parseInt($(this).css("top")) >= $(window).height()){
				$(this).remove();
			};
		});
       
	}
	
	//点击继续玩
	$(".replay").click(function(){
		num = 0;
		clearInterval(timer1);
		timer1 = setInterval(go,500);
		$(".numWrap").html("");
		$(".passWrap,.boxes").hide();
	});
	
	//点击去抽奖
	$(".draw").click(function(){
		clearInterval(timer1);
		$(".passWrap").hide();
		$(".tuanyuanWrap").show().addClass("on");	
		
		setTimeout(function(){
			$.fn.fullpage.moveSectionDown();
			$("#arrow").hide();
			
		},3000);
		
	});
	
	//点击活动规则
	$(".rule").click(function(){
		$(".rules,#mask").show();	
	});
	
	//点击赞助链接
	$(".apk").each(function(index, element) {
        $(this).click(function(){
			window.location.href = $(this).data("href");
			$.ajax({
				url: '/active/midAutumn/search.php',
				type: 'POST',
				dataType: 'json',
				timeout:60000,
				data:{
					u:u,
					s:s,
					gameid:$(this).data("id")
				},
				success: function(){},
				error: function(){}
			});
		});
    });
	
	/*转动代码*/
	var oStart = $(".start");
	var oZhuan = $(".zhuan");
	var numTurn = 10;
	var iSpeed = 0;
	var iCur = 0;
	var oBtn = true;
	var timer = null;
	var aDatas = [
					{"deg" : 22, "data" : "M6手机"},
					{"deg" : 67, "data" : "故事锁屏商务套装"},
					{"deg" : 112,"data" : "再接再厉"},
					{"deg" : 157,"data" : "100卡"},
					{"deg" : 202,"data" : "M6手机"},
					{"deg" : 247,"data" : "故事锁屏商务套装"},
					{"deg" : 292,"data" : "再接再厉"},
					{"deg" : 337,"data" : "100京东卡"}
				];
	
	$.ajax({
		url: '/active/midAutumn/search.php',
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
			/*if(data.code){
				$("#copy").attr("data-clipboard-text",data.code);
			};*/
			//loadImg();
			function loadImg() {
				var oLoading = document.getElementById('loading');
				var imgArr = ['images/flower.png','images/loading.gif','images/fail.png','images/pan.png','images/readText.png','images/circleText.png','images/rule.png','images/gushi.png','images/zhuan.png','images/ireader.png','images/start.png'];
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
		
			if(data.st == "2"){  //活动正常
				
				//点击go，统计参加人数
				$(".go").click(function(){
					$(".section3 .text,.section3 .text2,.go").hide();	
					timer1 = setInterval(go,500);
					
					//只有状态是M未参加的时候才发送请求
					if(resStatus == "M"){
						$.ajax({
							url: '/active/midAutumn/search.php',
							type: 'POST',
							dataType: 'json',
							timeout:15000,
							data:{
								u:u,
								s:s
							},
							success: function(){},
							error: function(){}
						});
					};
				});
				
				//点击转盘				
				oStart.click(function(){
	
					if(!isGo){
						toast("请先参加点月饼游戏",2600);
					}else{
						if (oBtn) {
						
							var num = Math.floor(Math.random() * 8);
							oStart.addClass("gray");
							num = 6;	
							
							timer = requestAnimationFrame(move);
							
							$.ajax({
								url: '/active/midAutumn/click.php',
								type: 'POST',
								dataType: 'json',
								timeout:15000,
								data:{
									u:u,
									s:s,
									type:"click"
								},
								success:function(data){
									
									resStatus = data.status;
									//resLevel = data.level;							
									if(data.level != "0"){
										resLevel = data.level;
									};
									
									//if(data.level == "3"){
//										resCode = data.code;
//										$("#copy").attr("data-clipboard-text",data.code);	
//									};
									
									switch (data.level){
										case "5":
											num = 4;
										break;
										case "4":
											num = 3;
										break;
										case "3":
											num = 7;
										break;
										case "2":
											num = 1;
										break;
										case "1":
											num = 0;
										break;
										case "0":
											num = 6;
										break;
									};
									
								},
								error:function(jqXHR,textStatus,errorThrown){
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
													
							function move(){
								
								iSpeed = ((360 * numTurn + aDatas[num].deg) - iCur) / 80;
								
								iCur += Math.ceil(iSpeed); 
								
								if (iCur >= numTurn * 360 + aDatas[num].deg) {
				
									window.cancelAnimationFrame(timer);
									
									oBtn = !oBtn;
									oStart.removeClass("gray");
									
	
										
										//转盘转结束之后
																			
										if(resData){ //有正常返回结果
											
											if(resData.status == "M"){//还可以抽奖
											
												switch (resLevel){
													case "5":  //S8
														
														iCur = aDatas[num].deg;
														$("#mask,.jdk").show();
														$(".jdk").find(".prize").attr("src","images/s8.png");
													break;
													case "4":  //50京东卡
														
														iCur = aDatas[num].deg;
														$("#mask,.chongzhi").show();
														$(".hongbaoForm").show();
														$(".hasHongbao").hide();
														$(".chongzhi").find(".prize").attr("src","images/50.png");
													break;
													case "3":  //100京东卡
														
														iCur = aDatas[num].deg;
														$("#mask,.chongzhi").show();
														$(".hongbaoForm").show();
														$(".hasHongbao").hide();
														$(".chongzhi").find(".prize").attr("src","images/jd.png");
													break;
													case "2":  //商务套装
														
														iCur = aDatas[num].deg;
														$("#mask,.jdk").show();
														$(".jdk").find(".prize").attr("src","images/tz.png");
													break;
													case "1":  //M6手机
														
														iCur = aDatas[num].deg;
														$("#mask,.jdk").show();
														$(".jdk").find(".prize").attr("src","images/phone.png");
													break;
													case "0":  //没中奖
													
														iCur = aDatas[num].deg;
														$('.success,#mask').stop(true,false).fadeIn('100',function(){//没有中奖
															setTimeout(function(){
																$('.success,#mask').fadeOut('200');	
															},1500);
														});
														
														
													break;							
												};
												
											}else{//机会用完了
												
												iCur = aDatas[num].deg;
												
												//$('.error,#mask').stop(true,false).fadeIn('100',function(){//三次机会用完了
	//												setTimeout(function(){
	//													$('.error,#mask').fadeOut('200',function(){
	//														setScrollTop();	
	//													});	
	//												},1500);
	//											});
												toast('您的机会用完了',2600);
											};
												
										}else{ //没有正常返回结果
											
											num = 6;
											iCur = aDatas[num].deg;
											$('.success,#mask').stop(true,false).fadeIn('100',function(){//没有中奖
												setTimeout(function(){
													$('.success,#mask').fadeOut('200');	
												},1500);
											});
											
										};
										
									
								}else{
									
									oZhuan.css("WebkitTransform","rotate(" + iCur + "deg)");
									requestAnimationFrame(move);
								};
									
							};
							
							oBtn = !oBtn;
							
						};		
					};
				
				});
				
				/*点击活动规则*/
				$(".ruleText").click(function(){
					if(oBtn){
						$("#mask,.rules").show();
					};	
				});
				
				/*点击中奖纪录*/
				$(".record").click(function(){
					
					if(oBtn){
						
						if(resLevel == "0"){
							toast('您还没有中奖纪录',2600);
						}else{
							switch (resLevel){
								case "5":  //S8手机
									
									$("#mask,.shouhuoWrap").show();
									$(".shouhuoWrap").find(".prizeImg").attr("src","images/s8.png");
									$('.addressInfo').find('.nameInfo').html(resData.name);
									$('.addressInfo').find('.phoneInfo').html(resData.phone);
									$('.addressInfo').find('.addrInfo').html(resData.adrs);
								break;
								case "4":  //50京东卡
									
									$("#mask,.chongzhi").show();
									$(".hongbaoForm").hide();
									$(".hasHongbao").show();
									$(".hasNum").html(resData.phone);
									$(".chongzhi").find(".prize").attr("src","images/50.png");
									//$(".text1").html(resCode.split(",")[0]);
									//$(".text2").html(resCode.split(",")[1]);
								break;
								case "3":  //100京东卡
									
									$("#mask,.chongzhi").show();
									$(".hongbaoForm").hide();
									$(".hasHongbao").show();
									$(".hasNum").html(resData.phone);
									$(".chongzhi").find(".prize").attr("src","images/jd.png");
									//$(".text1").html(resCode.split(",")[0]);
									//$(".text2").html(resCode.split(",")[1]);
								break;
								case "2":  //商务套装
									
									$("#mask,.shouhuoWrap").show();
									$(".shouhuoWrap").find(".prizeImg").attr("src","images/tz.png");
									$('.addressInfo').find('.nameInfo').html(resData.name);
									$('.addressInfo').find('.phoneInfo').html(resData.phone);
									$('.addressInfo').find('.addrInfo').html(resData.adrs);
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
	
	/*点击复制*/
	/*var copy = document.getElementById('copy');
    var clipboard = new Clipboard(copy);

    clipboard.on('success', function(e) {
		toast('复制成功',2600);
    });

    clipboard.on('error', function(e) {
       toast('复制失败',2600);
    });*/

	
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
	var rePhone = /^\d{11}$/;
	//只填写手机号点击确定
	$(".phoneCon").click(function(){
		if($(this).val() == ''){
			toast('请输入手机号',2600);
			return;
		}else{
			if(!rePhone.test($(this).val())){
				toast('输入正确的手机号格式',2600);
				return;
			}else{
				$.ajax({
					url: '/active/midAutumn/save.php',
					type: 'POST',
					dataType: 'json',
					timeout:15000,
					data: {
						u:u,
						s:s,
						phone:$('.phoneCon').val(),
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
				url: '/active/midAutumn/save.php',
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
	
	//music
	var audio = new Audio("images/1.mp3")
	audio.play();
	audio.volume = "0.2";
	
});