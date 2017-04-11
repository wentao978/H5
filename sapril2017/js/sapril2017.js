$(document).ready(function(){
	var uid = getQueryString('u');
	var s = getQueryString('s');
	
	var resData;
	var resLevel;
		
	var oBtn = true;
	var oLeft = ["0.3rem","5.1rem","9.8rem"];
	
	//点击活动规则
	$(".ruleWrap").click(function(){
		if(oBtn){
			$("#toast").hide();
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
	

	$.ajax({
		url: '/active/sapril2017/search.php',
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
			resLevel = parseInt(data.level);
			
			if(data.st == "2"){  //活动正常
				
				//剩余抽奖次数
				$(".time").html(data.number);
				$(".box").each(function(index,element){
                    
					$(element).click(function(){
						if(oBtn && !$(element).hasClass("active")){
							oBtn = false;
							$(".cursor,#toast").hide();
							//增加抖动
							$(element).addClass("shake");
							$(".box").each(function(index,element){
								$(this).find("img").attr("src","images/box"+(index+1)+".png");	
							});
							//点击的时候判断一下点击次数
							if(parseInt(resData.number) > 0){
								//有剩余次数，点击的时候开始发送请求
								$.ajax({
									url: '/active/sapril2017/click.php',
									type: 'POST',
									dataType: 'json',
									timeout:60000,
									data:{
										u:uid,
										s:s,
										type:"click"
									},
									success: function(data){
										oBtn = true;										
										if(parseInt(data.level) != 0){
											resLevel = parseInt(data.level);
										}
										resData.number = data.number;
										$(".time").html(data.number);
										if(parseInt(data.level) != 0){
											//中奖
											$(".star").css("left",oLeft[index]).show();
											//移除抖动
											$(".box"+(index+1)).removeClass("shake");
											$(".box"+(index+1)).find("img").attr("src","images/box"+(index+1)+"-active.png");
											setTimeout(function(){
												switch (parseInt(data.level)) {
													case 1 :
													case 2 :
														$(".lingqu,#mask").show();
														$(".lingqu").find(".prize").attr("src","images/l_"+data.level+".png");
													break;
													case 3 :
														$(".chongzhi,#mask").show();
														$(".hongbaoForm").show();
														$(".hasHongbao").hide();
														$(".inaddress").eq(0).show();
														$(".inaddress").eq(1).show();
														$(".chongzhi").find(".prize").attr("src","images/l_"+data.level+".png");
													break;
												}	
											},200);	
										}else{
											//没中奖	
											fail(2);
										}
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
								
							}else{
								oBtn = true;
								fail(3);	
							};
						};
					});
					
                });
				
				
				/*点击中奖纪录*/
				$(".recordWrap").click(function(){
					
					if(oBtn){
						$("#toast").hide();
						if(resLevel == 0){
							fail(1);
						}else{
							switch (resLevel){
								case 1:  //M6手机
								case 2:  //电饭煲	
									$("#mask,.shouhuoWrap").show();
									$(".shouhuoWrap").find(".prizeImg").attr("src","images/l_"+resLevel+".png");
									$('.addressInfo').find('.nameInfo').html(resData.name);
									$('.addressInfo').find('.phoneInfo').html(resData.phone);
									$('.addressInfo').find('.addrInfo').html(resData.adrs);
								break;
								case 3:  //50充值卡
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
		$('#mask,.lr,.star').hide();
		$(".box").each(function(index,element){
			$(this).find("img").attr("src","images/box"+(index+1)+".png");	
		});						
		clearInput($(this),'.formNum');
		clearInput($(this),'.formPerson');
		clearInput($(this),'.formAddress');	
		clearInput($(this),'.phoneNum');
	});
	
	/*输入框获取焦点时上移*/
	$('.phoneNum').focus(function(){    
		$(".chongzhi").css("animation-fill-mode","none").css("opacity","1");
		$(".chongzhi").css("transform","translate3d(-50%,-75%,0) scale(1)");	
	}).blur(function(){
		$(".chongzhi").css("animation-fill-mode","none").css("opacity","1");
		$(".chongzhi").css("transform","translate3d(-50%,-50%,0) scale(1)");
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
	
	function fail(index){
		var no = null;
		$(".fail").find("img").eq(0).attr("src","images/fail_"+index+".png");
		$('.fail,#mask').stop(true,false).fadeIn('200',function(){//没有中奖
			clearTimeout(no);
			no = setTimeout(function(){
				$('.fail,#mask').fadeOut('200');	
			},1500);
		});
		$(".fail,#mask").click(function(){
			clearTimeout(no);
			$('.fail,#mask').stop(true,false).fadeOut('200');			
		});
	};
	
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