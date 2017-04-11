$(document).ready(function(){
	var u = getQueryString('u');
	var s = getQueryString('s');
	
	var resData;
	var resLevel;
	var resPrize;
	var resNumber;
	
	$('#dowebok').fullpage({
		onLeave: function(anchorLink, index,slideIndex,direction){
			if(index == 3){
				$("body").css("background-color","#D1FF9A");
				$("#arrow").hide();
			}
			if(index == 1){
				$("body").css("background-color","#FFF728");
				$("#arrow").show();
			}
			if(index == 2){
				$("body").css("background-color","#ADD9FE");
				$("#arrow").show();
			}
			
		},
		verticalCentered:false,
		css3:true
	});
	
	$(".phoneNum").focus(function(){
		$(".chongzhi").css("top","-5em");
	}).blur(function(){
		$(".chongzhi").css("top","0");
	});
	
		
	$.ajax({
		url: '/active/thanks/search.php',
		type: 'GET',
		dataType: 'json',
		timeout:60000,
		data:{
			uid:u,
			s:s,
			type:"search"
		},
		success: function(data){
			resData = data;
			resLevel = parseInt(data.level);
			resNumber = parseInt(data.number);
			resPrize = data.prize;
		
			if(data.st == "2"){  //活动正常
				
				$(".p32Wrap").click(function(){
										
					if(resNumber == 1){ //这个值为1才可以抽奖
						
						$.ajax({
							url: '/active/thanks/click.php',
							type: 'GET',
							dataType: 'json',
							timeout:60000,
							data:{
								uid:u,
								s:s,
								type:"click"
							},
							success: function(data){
								resNumber = parseInt(data.number);
								resLevel = parseInt(data.level);
								switch (parseInt(data.level)){
									case 3:  //10京东卡										
										$("#mask,.yuebing").show();
										$(".yuebing").find(".prize").attr("src","images/prize_3.png");
										$(".text1").html(data.prize.split(",")[0]);
										$(".text2").html(data.prize.split(",")[1]);
									break;
									case 2:  //30元手机充值卡										
										$("#mask,.chongzhi").show();
										$(".hongbaoForm").show();
										$(".hasHongbao").hide();
										$(".chongzhi").find(".prize").attr("src","images/prize_2.png");
										$(".inaddress").eq(0).show();
										$(".inaddress").eq(1).hide();
									break;
									case 1:   //商务套装										
										$("#mask,.jdk").show();
										$(".jdk").find(".prize").attr("src","images/prize_1.png");
									break;
									case 0:
										var no = null;
										$(".success").find("img").attr("src","images/fail"+Math.floor(Math.random()*3+1)+".png");
										$('.success,#mask').stop(true,false).fadeIn('200',function(){//没有中奖
											no = setTimeout(function(){
												$('.success,#mask').fadeOut('200');	
											},1500);
										});
										$(".success,#mask").click(function(){
											clearTimeout(no);
											$('.success,#mask').stop(true,false).fadeOut('200');			
										});
									break;									
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
							}
						});	
						
					}else if(resNumber == 0){ //为0时不能抽奖
						
						if(resLevel == 0){//这个值为0，说明抽过了并且没中奖
							var no = null;
							$(".success").find("img").attr("src","images/fail"+Math.floor(Math.random()*3+1)+".png");
							$('.success,#mask').stop(true,false).fadeIn('200',function(){//没有中奖
								no = setTimeout(function(){
									$('.success,#mask').fadeOut('200');	
								},1500);
							});
							$(".success,#mask").click(function(){
								clearTimeout(no);
								$('.success,#mask').stop(true,false).fadeOut('200');			
							});
						}else{// 这个值为1，说明抽过了，并且中中奖了，显示中奖记录
							switch (resLevel){
								case 3:  //10京东卡									
									$("#mask,.yuebing").show();
									$(".yuebing").find(".prize").attr("src","images/prize_3.png");
									$(".text1").html(resPrize.split(",")[0]);
									$(".text2").html(resPrize.split(",")[1]);
								break;
								case 2:  //30元手机充值卡									
									$("#mask,.chongzhi").show();
									$(".hongbaoForm").hide();
									$(".hasHongbao").show();
									$(".chongzhi").find(".prize").attr("src","images/prize_2.png");
									$(".hasNum").html(resData.phone);
									$(".inaddress").eq(0).hide();
									$(".inaddress").eq(1).show();
								break;
								case 1:   //商务套装									
									$("#mask,.addressInfo").show();
									$(".addressInfo").find(".prizeImg").attr("src","images/prize_1.png");
									$('.addressInfo').find('.nameInfo').html(resData.name);
									$('.addressInfo').find('.phoneInfo').html(resData.phone);
									$('.addressInfo').find('.addrInfo').html(resData.adrs);
								break;	
							};
						}
						
					}
						
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
		if($(".phoneNum").val() == ''){
			toast('请输入手机号',2600);
			return;
		}else{
			if(!rePhone.test($(".phoneNum").val())){
				toast('输入正确的手机号格式',2600);
				return;
			}else{
				$.ajax({
					url: '/active/thanks/save.php',
					type: 'POST',
					dataType: 'json',
					timeout:15000,
					data: {
						uid:u,
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
				url: '/active/thanks/save.php',
				type: 'POST',
				dataType: 'json',
				timeout:15000,
				data: {
					uid:u,
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

	
});