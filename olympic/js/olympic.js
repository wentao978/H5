$(document).ready(function(){
	var u = getQueryString('u');
	var s = getQueryString('s');
	
	var resData;
	var resNumber;
	var resTime;
	var gtotal = "";
	
	String.prototype.iphone = function(){
		return this.replace(/\d{1}(?=[\d\D]{4,7}$)/ig,"*")
	};
	
	/**
     *level：1-掌阅，2-考拉海购，3-网易漫画，4-蚂蜂窝，5-1905电影票，6-1905会员，7-100元话费，8-100元京东e卡，9-50元充值卡，10-m6手机
	 *
	*/
	var textArr = ["掌阅500阅饼券一张","考拉海淘158元优惠券组合","网易漫画VIP会员","蚂蜂窝10元直减代金券一张","盗墓笔记电影票一张","1905电影网VIP会员","价值100元骏网一卡通","100元京东e卡","50元充值卡","金立超级续航手机M6 Plus"];
	var urlArr = ["http://m.appgionee.com/mobile/soft/detail?vid=37&tid=11&a=9&id=14712&cpv=5.4.0","http://m.appgionee.com/mobile/soft/detail?vid=355&tid=41&c=&a=9&nt=&fr=&i=&s=&m=&imei=&mac=&id=137270&cpv=3.0.4","http://m.appgionee.com/mobile/soft/detail?vid=37&tid=41&c=&a=9&nt=&fr=&i=&s=&m=&imei=&mac=&id=143432&cpv=2.0.0","http://m.appgionee.com/mobile/soft/detail?vid=33&tid=41&c=&a=9&nt=&fr=&i=&s=&m=&imei=&mac=&id=10998&cpv=7.5.1","http://m.1905.com/App/showappList/id/1?__hz=f033ab37c30201f7","http://m.1905.com/App/showappList/id/1?__hz=f033ab37c30201f7","","","",""];
	var infoArr = ["<li>1.下载掌阅APP，安装进入书城；</li><li>2.点击【我的】-【我的资产】-【礼品中心】；</li><li>3.输入兑换码，兑换阅饼使用</li>","<li>1.下载网易考拉海购APP，注册登录；</li><li>2.进入【我的考拉】-【我的优惠券】-【兑换】，输入兑换码；</li><li>3.仅限新用户，含：无门槛10元 199减20 299减30 399减40 699减58   （合计158元）；</li><li>4.有效期：8.6-8.31</li>","<li>1.下载网易漫画客户端，在右下角“账号”中注册登录，【兑换VIP】输入券码即可；</li><li>2.兑换成功后免费享用1个月VIP会员特权，本次会员仅限金立用户，新老用户皆可领取；</li><li>3.有效期为8.6-8.31</li>","<li>1.下载蚂蜂窝自由行app，注册登录；</li><li>2.进入用户中心，添加优惠券码，下单后立减使用；</li><li>3.有效期为2016/09/30</li>","<li>1.登录格瓦拉手机app，新用户先注册；</li><li>2.选择影片场次座位和手机号码，进入兑换页面选择票券，输入兑换券密码；</li><li>3.兑换成功收到短信，凭短信中密码到现场取票</li>","<li>1.登录1905电影网手机app，新用户先下载注册；</li><li>2.点击“我的”，选择“使用会员卡兑换-VIP会员券-兑换”</li><li>3.输入会员券号并绑定，即可使用</li>","<li>1、打开骏网：http://junka.com/</li><li>2、左侧“全站快速导航”，选择“话费充值”或充值游戏点卡；</li><li>3、在充值页面选择“点卡类型”“100元”，输入一卡通卡号和密码；</li><li>4、根据提示输入充值手机号或游戏账号，输入验证码，点击“立即充值”；</li><li>5、有效期：2017-05-31</li>","<li>1、登陆京东网上商城；</li><li>2、在购物提交订单之前选择“使用京东E卡”，选择已绑定的卡或者输入E卡密码，点击添加；</li><li>3、开启并输入支付密码，即可使用；</li><li>4、有效期：自激活日起36个月；</li>","请保持活动登记的手机号畅通，工作人员将尽快通过短信或电话联系您！","请保持活动登记的手机号畅通，工作人员将尽快通过短信或电话联系您！"];
	
	$(".day").html(new Date().getDate()+1);
	
			
	$.ajax({
		url: '../js/olympic.php',
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
			resTime = parseInt(data.time.split("-")[2])
						
			//loadImg();
			function loadImg() {
				var oLoading = document.getElementById('loading');
				var imgArr = ['http://nav.gionee.com/htm/olympic/images/bg.jpg','../images/loading.gif'];
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
		
			if(resTime < 6){
				$(".load").show().css("background","transparent").empty();
				document.onclick = function(){
					toast('活动未开始',2600);
				};
			}else if(resTime >= 21){
				$(".inWrap").hide();
				$(".hasWrap").show();
				$(".day").html("21");
				if( resTime > 12 ){
					$("#input2").attr("disabled","disabled").addClass("gray");	
				};
				$("#input1").val(resData.user.grandtotal);
				$(".prize").html(resData.user.grandtotal);
				$("#input2").val(resData.total.total);
				$("#input3").val(resData.total.phone).attr("disabled","disabled");
				
				//根据是否中奖显示个人中奖还是中奖名单
				if(!!resData.code.level && !!resData.code.code){
					$(".nameContent1,.nameContent0").hide();
					$(".nameContent2").show();
					$(".nameContent2").find(".prizeName").html(textArr[parseInt(resData.code.level)-1]);
					$(".nameContent2").find(".prizeCode").html(resData.code.code);
					if(resData.code.level == "9" || resData.code.level == "10"){
						$(".prizeCodeWrap,#copy").hide();
					}
					$("#copy").attr("data-clipboard-text",resData.code.code);
				}else if( !resData.code.level && !resData.code.code && resData.list.length ){//滚动显示名单
					$(".nameContent1").show();
					$(".nameContent2,.nameContent0").hide();
					var str = "<li>";
					console.log(resData.list.length)
					for(var i=0,len=resData.list.length;i<len;i++){
						if(i%3 == 0 && i != 0){
							str += "</li><li>";
						};
						str += "<span>"+resData.list[i].split(" ")[0].iphone() +"   获得"+textArr[parseInt(resData.list[i].split(" ")[1])-1]+"</span>";
					};
					str += "</li>";
					
					//滚动
					var oUl = $('#scrollDiv').find('ul');
					oUl.empty();
					oUl.html(str);
					var aLi = oUl.children('li');
					var H = aLi.eq(0).height();
					var iNow = 0;
					var iNow2 = 0;
					
					if(resData.list.length>3){
						setInterval(function(){
							if(iNow == 0){
								aLi.eq(0).css('position','static');
								oUl.css('top','0');
								iNow2 = 0;
							};
							if(iNow == aLi.length - 1 ){
								iNow = 0;
								aLi.eq(0).css('position','relative').css('top',aLi.length*H);
							}else{
								iNow++;
							};
							iNow2++;
							oUl.animate({top:-H*iNow2}, 1000);
						},5000);	
					};
				}else{
					$(".nameContent0").show();
					$(".nameContent2,.nameContent1").hide();
					if(resTime >= 22){
						$(".nameContent0").show().html("猜总金牌数活动即将开奖！");
					};
				};
				//...
				
				$(".topWrap,.totalWrap").click(function(){
					toast('猜金牌活动已结束',2600);
				});
			}else{//活动正常
				//赋值
				$(".day").html(resTime+1);
				$("#input1").val(resData.user.grandtotal);
				$("#input2").val(resData.total.total);
				$("#input3").val(resData.total.phone);
				if( resTime > 12 ){
					$("#input2").attr("disabled","disabled").addClass("gray");	
				};
				
				//根据状态判断是输入还是显示输入 
				if(resData.status.toLowerCase() == "y"){
					$(".inWrap").show();
					$(".hasWrap").hide();
				}else if(resData.status.toLowerCase() == "n"){
					$(".inWrap").hide();
					$(".hasWrap").show();
					$(".prize").html(data.user.grandtotal);
					//$("#submit").removeClass("disabled").removeAttr("disabled");
				};
				
				//判断输入--第一个输入框
				$("#input1").bind("keyup change propertychange",function(){
					var re = /\D+/gi;
					if($.trim($(this).val()) == ""){ //为空
						$(".tip1").hide().html("");	
						if( ( ($.trim($("#input1").val()) != "" && $(".tip1").html() == "") || $.trim($("#input2").val()) != "" && $(".tip2").html() == "" ) && $.trim($("#input3").val()) != "" && $(".tip3").html() == "" ){
							console.log(1)
							if( $(".tip1").html() == "" && $(".tip2").html() == "" && $(".tip3").html() == "" ){
								$("#submit").removeClass("disabled").removeAttr("disabled");
							}else{
								$("#submit").addClass("disabled").attr("disabled","disabled");
							};
						}else{
							console.log(2)
							$("#submit").addClass("disabled").attr("disabled","disabled");
						};
					}else{ // 不为空
						if(re.test($(this).val())){
							$(".tip1").show().html("<span class='red'>错误提示：</span>请输入数字");
							
							
							if( ( ($.trim($("#input1").val()) != "" && $(".tip1").html() == "") || $.trim($("#input2").val()) != "" && $(".tip2").html() == "" ) && $.trim($("#input3").val()) != "" && $(".tip3").html() == "" ){
								console.log(1)
								if( $(".tip1").html() == "" && $(".tip2").html() == "" && $(".tip3").html() == "" ){
									$("#submit").removeClass("disabled").removeAttr("disabled");
								}else{
									$("#submit").addClass("disabled").attr("disabled","disabled");
								};
							}else{
								console.log(2)
								$("#submit").addClass("disabled").attr("disabled","disabled");
							};
							
						}else{
							$(".tip1").hide().html("");
							if( ( ($.trim($("#input1").val()) != "" && $(".tip1").html() == "") || $.trim($("#input2").val()) != "" && $(".tip2").html() == "" ) && $.trim($("#input3").val()) != "" && $(".tip3").html() == "" ){
								console.log(3)
								if( $(".tip1").html() == "" && $(".tip2").html() == "" && $(".tip3").html() == "" ){
									$("#submit").removeClass("disabled").removeAttr("disabled");
								}else{
									$("#submit").addClass("disabled").attr("disabled","disabled");
								};
							}else{
								console.log(4)
								$("#submit").addClass("disabled").attr("disabled","disabled");
							};
						};	
					};		
				});
				//判断输入--第二个输入框
				$("#input2").bind("keyup change propertychange",function(){
					var re = /\D+/gi;
					if($.trim($(this).val()) == ""){//为空
						$(".tip2").hide().html("");
						if( ( ($.trim($("#input1").val()) != "" && $(".tip1").html() == "") || $.trim($("#input2").val()) != "" && $(".tip2").html() == "" ) && $.trim($("#input3").val()) != "" && $(".tip3").html() == "" ){
							console.log(1)
							if( $(".tip1").html() == "" && $(".tip2").html() == "" && $(".tip3").html() == "" ){
								$("#submit").removeClass("disabled").removeAttr("disabled");
							}else{
								$("#submit").addClass("disabled").attr("disabled","disabled");
							};
						}else{
							console.log(2)
							$("#submit").addClass("disabled").attr("disabled","disabled");
						};	
					}else{//不为空
						if(re.test($(this).val())){
							$(".tip2").show().html("<span class='red'>错误提示：</span>请输入数字");
							if( ( ($.trim($("#input1").val()) != "" && $(".tip1").html() == "") || $.trim($("#input2").val()) != "" && $(".tip2").html() == "" ) && $.trim($("#input3").val()) != "" && $(".tip3").html() == "" ){
								if( $(".tip1").html() == "" && $(".tip2").html() == "" && $(".tip3").html() == "" ){
									$("#submit").removeClass("disabled").removeAttr("disabled");
								}else{
									$("#submit").addClass("disabled").attr("disabled","disabled");
								};
							}else{
								$("#submit").addClass("disabled").attr("disabled","disabled");
							};
						}else{
							$(".tip2").hide().html("");
							if( ( ($.trim($("#input1").val()) != "" && $(".tip1").html() == "") || $.trim($("#input2").val()) != "" && $(".tip2").html() == "" ) && $.trim($("#input3").val()) != "" && $(".tip3").html() == "" ){
								if( $(".tip1").html() == "" && $(".tip2").html() == "" && $(".tip3").html() == "" ){
									$("#submit").removeClass("disabled").removeAttr("disabled");
								}else{
									$("#submit").addClass("disabled").attr("disabled","disabled");
								};
							}else{
								$("#submit").addClass("disabled").attr("disabled","disabled");
							};	
						};	
					};		
				});
				//判断输入--第三个输入框
				$("#input3").bind("keyup change propertychange",function(){
					var re = /^1[3|5|7|8][0-9]\d{8}$/;
					if($.trim($(this).val()) == ""){
						$(".tip3").hide().html("");
						if( $(".tip1").html() == "" && $(".tip2").html() == "" && $(".tip3").html() == "" ){
							if( ($("#input1").val() != "" || $("#input2").val() != "") && $("#input3").val() != "" ){
								$("#submit").removeClass("disabled").removeAttr("disabled");	
							};
						}else{
							$("#submit").addClass("disabled").attr("disabled","disabled");
						};	
					}else{
						if(re.test($(this).val())){;
							$(".tip3").hide().html("");
							if( ( ($.trim($("#input1").val()) != "" && $(".tip1").html() == "") || $.trim($("#input2").val()) != "" && $(".tip2").html() == "" ) && $.trim($("#input3").val()) != "" && $(".tip3").html() == "" ){
								console.log("*****");
								if( $(".tip1").html() == "" && $(".tip2").html() == "" && $(".tip3").html() == "" ){
									$("#submit").removeClass("disabled").removeAttr("disabled");
									console.log("1111");
								}else{
									$("#submit").addClass("disabled").attr("disabled","disabled");
									console.log("2222");
								};
							}else{
								$("#submit").addClass("disabled").attr("disabled","disabled");
							};
						}else{
							$(".tip3").show().html("<span class='red'>错误提示：</span>请输入11位数字的正确的手机号码");
							if( ( ($.trim($("#input1").val()) != "" && $(".tip1").html() == "") || $.trim($("#input2").val()) != "" && $(".tip2").html() == "" ) && $.trim($("#input3").val()) != "" && $(".tip3").html() == "" ){
								if( $(".tip1").html() == "" && $(".tip2").html() == "" && $(".tip3").html() == "" ){
									$("#submit").removeClass("disabled").removeAttr("disabled");
								}else{
									$("#submit").addClass("disabled").attr("disabled","disabled");
								};
							}else{
								$("#submit").addClass("disabled").attr("disabled","disabled");
							};
						};	
					};		
				});
				
				//根据是否中奖显示个人中奖还是中奖名单
				if(!!resData.code.level && !!resData.code.code){
					$(".nameContent1,.nameContent0").hide();
					$(".nameContent2").show();
					$(".nameContent2").find(".prizeName").html(textArr[parseInt(resData.code.level)-1]);
					$(".nameContent2").find(".prizeCode").html(resData.code.code);
					if(resData.code.level == "8"){
						$(".prizeCodeWrap,#copy").hide();
					}
					$("#copy").attr("data-clipboard-text",resData.code.code);
				}else if( !resData.code.level && !resData.code.code && resData.list.length ){//滚动显示名单
					$(".nameContent1").show();
					$(".nameContent2,.nameContent0").hide();
					var str = "<li>";
					console.log(resData.list.length)
					for(var i=0,len=resData.list.length;i<len;i++){
						if(i%3 == 0 && i != 0){
							str += "</li><li>";
						};
						str += "<span>"+resData.list[i].split(" ")[0].iphone() +"   获得"+textArr[parseInt(resData.list[i].split(" ")[1])-1]+"</span>";
					};
					str += "</li>";
					
					//滚动
					var oUl = $('#scrollDiv').find('ul');
					oUl.empty();
					oUl.html(str);
					var aLi = oUl.children('li');
					var H = aLi.eq(0).height();
					var iNow = 0;
					var iNow2 = 0;
					
					if(resData.list.length>3){
						setInterval(function(){
							if(iNow == 0){
								aLi.eq(0).css('position','static');
								oUl.css('top','0');
								iNow2 = 0;
							};
							if(iNow == aLi.length - 1 ){
								iNow = 0;
								aLi.eq(0).css('position','relative').css('top',aLi.length*H);
							}else{
								iNow++;
							};
							iNow2++;
							oUl.animate({top:-H*iNow2}, 1000);
						},5000);	
					};
				}else{
					$(".nameContent0").show();
					$(".nameContent2,.nameContent1").hide();
				};
				//...
				
			};	
		},
		error:function(jqXHR, textStatus, errorThrown){
			//$('#loading').hide();
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
			document.onclick = function(){
				toast('数据异常',2600);
			};
		}
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
		
	/*****点击操作*****/
	$(".zClose").click(function(){
		$(this).parent().hide();	
	});
	
	$(".zhongjiang").click(function(){
		$(".zjjl").show();
		$('.load').show();
		$.ajax({
			url: '../js/olympic3.php',
			type: 'GET',
			dataType: 'json',
			timeout:60000,
			data:{
				u:u,
				s:s
			},
			success: function(data){
				$('.load').hide();
				if(data.list.length){
					var html = "";
					for(var i=0,len=data.list.length;i<len;i++){
						var tempArr = data.list[i].split(" ");
						html += '<div class="oplist"><span class="pdate dib">8月'+tempArr[0]+'日</span><span class="pname">'+textArr[parseInt(tempArr[1])-1]+'</span><span class="use fr">使用说明</span></div>\
									<ul class="useinfo">'+(parseInt(tempArr[1]) >=9 ? '' : '<li>兑换码：<span class="black">'+tempArr[2]+'</span></li>')+infoArr[parseInt(tempArr[1])-1]+(parseInt(tempArr[1]) >= 7 ? '' : '<li class="tr"><a href="'+urlArr[parseInt(tempArr[1])-1]+'">立即下载</a></li>')+'</ul>';
					};
					$(".prizeList").html("").html(html).show();
					$(".use").click(function(){
						var _this = $(this);
						if(!$(this).hasClass("zs")){
							$(this).parent().next("ul").slideDown(function(){
								_this.addClass("zs").html("关闭");		
							});
						}else{
							$(this).parent().next("ul").slideUp(function(){
								_this.removeClass("zs").html("使用说明");
							});
						};	
					});
					$(".noPrize").hide();
				}else{
					$(".prizeList").hide();
					$(".noPrize").show();
				};
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
				document.onclick = function(){
					toast('数据异常',2600);
				};
			}
		});
			
	});
	
	//点击提交
	var rePhone = /^\d{11}$/;
	$('#submit').click(function(){
		if($(this).hasClass("disabled")){
			//toast('请检查输入值是否正确',2600);
			return;
		}else{
			if(resData.status.toLowerCase() == "n"){
				gtotal = "";
				var data = {type:"save",u:u,s:s,g:gtotal,ph:$("#input3").val(),t:$("#input2").val()};
			}else{
				var data = {type:"save",u:u,s:s,g:$("#input1").val(),ph:$("#input3").val(),t:$("#input2").val()};
			};
			$('.load').show();
			$.ajax({
				url: '../js/olympic2.php',
				type: 'POST',
				dataType: 'json',
				timeout:15000,
				data: data,
				success: function(data,status,code){
					if(data.ResultMsg == "1" && data.Resultinsert == "1"){
						toast('保存成功',2600);
						$("#input2,#input3").addClass("hasGray");
						$("#submit").addClass("disabled").attr("disabled","disabled");
						
						if(resData.status.toLowerCase() == "y"){
							$(".inWrap").hide();
							$(".hasWrap").show();
							gtotal = $("#input1").val() && resData.status.toLowerCase() == "y" ?  $("#input1").val() : gtotal ;
							$(".prize").html(gtotal);
							$("#input1").val("");
						}
						
					}else{
						toast('保存失败',2600);
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