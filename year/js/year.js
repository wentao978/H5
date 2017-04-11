$(document).ready(function(){
	var u = getQueryString('u');
	var s = getQueryString('s');
	
	var data = {
					"datas": [
					{
					"pd": " http://musicdata.gionee.com/ringfile/CB/FF/6AAFD0CE4949BFEACB866824CAA4.mp3",
					"d": 1,
					"s": 1,
					"ri": 1,
					"pn": "恭喜发财2016,刘德华",
					"pi": 0
					},
					{
					"d": 2,
					"s": 1,
					"ri":"",
					"pn":"",
					"pi":3
					},
					{
					"d": 3,
					"s": 1,
					"ri": 2,
					"pn": "精美手机支架",
					"pi": 12
					},
					{
					"d": 4,
					"s": 1,
					"ri":"",
					"pn":"",
					"pi":16
					},
					{
					"pd": "JL_NEWYEAR01222933777582",
					"d": 5,
					"s": 1,
					"ri": 1,
					"pn": "京东优惠券",
					"pi": 7
					},
					{
					"d": 6,
					"s": 0
					},
					{
					"d": 7,
					"s": 3
					},
					{
					"d": 8,
					"s": 3
					}
					],
					"msgs": [
					{
					"n": "河北 130XXXXX097 ",
					"pn": "飞利浦耳机"
					},
					{
					"n": "浙江 186XXXXX357 ",
					"pn": "20元现金红包"
					},
					{
					"n": "福建 156XXXXX413 ",
					"pn": "魔鬼猫公仔"
					},
					{
					"n": "黑龙江 185XXXXX352",
					"pn": "30元电话卡"
					},
					{
					"n": "北京 138XXXXX277 ",
					"pn": "创意手机支架"
					},
					{
					"n": "上海 137XXXXX866 ",
					"pn": "精美CD"
					},
					{
					"n": "广东 158XXXXX014 ",
					"pn": "100元京东购物卡"
					},
					{
					"n": "广东 186XXXXX647 ",
					"pn": "魔鬼猫公仔"
					},
					{
					"n": "江苏 133XXXXX306 ",
					"pn": "30元电话卡"
					},
					{
					"n": "湖北 139XXXXX399 ",
					"pn": "20元现金红包"
					},
					{
					"n": "山西 131XXXXX254 ",
					"pn": "飞利浦耳机"
					},
					{
					"n": "贵州 131XXXXX011 ",
					"pn": "创意手机支架 "
					},
					{
					"n": "湖北 159XXXXX435 ",
					"pn": "100元京东购物卡 "
					},
					{
					"n": "云南 130XXXXX866 ",
					"pn": "精美CD"
					},
					{
					"n": "甘肃 136XXXXX222 ",
					"pn": "魔鬼猫公仔"
					},
					{
					"n": "山东 150XXXXX813 ",
					"pn": "20元现金红包 "
					},
					{
					"n": "黑龙江 150XXXXX813",
					"pn": "创意手机支架"
					},
					{
					"n": "福建 133XXXXX041 ",
					"pn": "魔鬼猫公仔"
					},
					{
					"n": "四川 186XXXXX295 ",
					"pn": " 创意手机支架 "
					},
					{
					"n": "中书省 188XXXX888",
					"pn": "精美手机支架"
					}
					],
					"n": 6 
		};
	
	$.ajax({
		//url: 'getDays.do',
		type: 'GET',
		dataType: 'json',
		success:function(){
		
		},
		error: function(){
			
		}
	});
	
	console.log(data.msgs);
	var prizeHtml = '';
	for(var i = 0; i<data.msgs.length;i++){
		prizeHtml += '<li><span>'+data.msgs[i].n+'</span>&nbsp;获得<span>'+data.msgs[i].pn+'</span>一个</li>';
	}
	$('#scrollDiv').find('ul').html(prizeHtml);
	
	
	var imagesArr = [];
	var n = data.n; //从服务端获取今天是第几天
	if(n<1){
		$(document).on('click',function(){
			toast('活动还没开始',2600);	
		});
	}else if(n>8){
		$(document).on('click',function(){
			toast('抱歉，活动结束',2600);	
		});	
	}else{
		/***********设置遮罩的高度***********/
		var oMh;
		var oIm = new Image();
		oIm.src = '../images/base.jpg';
		oIm.onload = function(){
			oMh = $(document).height() > $(window).height() ? $(document).height() : $(window).height();	
			$('#mask').css('height',oMh);
		};
		oIm.onerror = function(){
			oMh = $(document).height() > $(window).height() ? $(document).height() : $(window).height();	
			$('#mask').css('height',oMh);
		};
		/***********关闭按钮***********/
		$('.close-button').click(function(){
			$(this).parent('div').hide();
			$('#mask').hide();	
			if(!sing.paused){
				sing.pause();
				sing.attr('src','');
				play.attr('src','../images/pause.png');
			};
			clearInput($(this),'.phoneNum');
			clearInput($(this),'.formNum');
			clearInput($(this),'.formPerson');
			clearInput($(this),'.formArea');
			clearInput($(this),'.formAddress');
		});
		/************音乐***********/
		var sing = $('.sing').get(0);
		var play = $('.play');
		var slideWrap = $('.slideWrap');
		var inDiv = $('.inDiv');
		var pBtn = $('.pbtn');
		play.click(function(){
			if(sing.paused){
				sing.play();
				play.attr('src','../images/play.png');
			}else{
				sing.pause();
				play.attr('src','../images/pause.png');
			};	
		});
		setInterval(function(){
			var Left = (parseInt(sing.currentTime)/parseInt(sing.duration))*(slideWrap.outerWidth() - pBtn.outerWidth());
			pBtn.css('left',Left);
			inDiv.css('width',Left+pBtn.outerWidth());
			if( parseInt(sing.currentTime) == parseInt(sing.duration) ){
				play.attr('src','../images/pause.png');
			};
		},1000);
		var disX;
		pBtn.on('touchstart',function(d){
			var This = $(this);
			var e = d.originalEvent.changedTouches[0];
			disX = e.clientX - pBtn.position().left;
			$(this).on('touchmove.drag',function(d){
				var e = d.originalEvent.changedTouches[0];
				var L = e.clientX - disX;
				if(L < 0){
					L = 0;
				}else if(L > slideWrap.outerWidth() - pBtn.outerWidth()){
					L = slideWrap.outerWidth() - pBtn.outerWidth();
				};
				pBtn.css('left',L);
				inDiv.css('width',L+pBtn.outerWidth());
				var scale = L /	(slideWrap.outerWidth() - pBtn.outerWidth());
				sing.currentTime = scale * parseInt(sing.duration);
			});
			$(this).on('touchend.drag',function(){
				$(this).off('.drag')
			});	
		});
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
		/*根据不同的天显示不同的苹果*/
		var d = n;  //第几天
		var datas = data.datas;
		var Index;
		var dataInfo;
		var jdUrl = ['http://coupon.m.jd.com/coupons/show.action?key=79bb2beaa6174f0480265e73c629cd93&roleId=2256306&to=sale.jd.com/act/e27kefanpv.html','http://coupon.m.jd.com/coupons/show.action?key=374936e13c154985a45ee9128e27ad86&roleId=2256311&to=sale.jd.com/act/e27kefanpv.html','http://coupon.m.jd.com/coupons/show.action?key=f7df656974014517a86fec13579c5273&roleId=2256313'];
		var jdText = ['金立年货节优惠券<br>999-50','金立年货节优惠券<br>1999-100','金立年货节优惠券<br>2999-150'];
		var tdayPosition = [{"left":"5em","top":"10.6em"},{"left":"8.1em","top":"7.5em"},{"left":"11em","top":"11.3em"},{"left":"5.06em","top":"7.17em"},{"left":"2.6em","top":"8.6em"},{"left":"8em","top":"11em"},{"left":"2.68em","top":"11em"},{"left":"10.6em","top":"8.8em"}];
		var chatPosition = [{"left":"4.4em","top":"13.5em"},{"left":"6.6em","top":"10.2em"},{"left":"9.6em","top":"14em"},{"left":"7.18em","top":"9.83em"},{"left":"5em","top":"11em"},{"left":"10em","top":"13.8em"},{"left":"5em","top":"13.6em"},{"left":"12.6em","top":"11.8em"}];
		$('.qiqiu').each(function(index,element){
            $(this).find('img').attr('src','../images/day'+d+'/q'+(index+1)+'.png');
			imagesArr.push('../images/day'+d+'/q'+(index+1)+'.png');
        });
		$('.appleDiv').each(function(index,element){
			var This = $(this);
			$(this).find('img').attr('src','../images/day'+d+'/littleapple/apple'+(index+1)+'.png');
			imagesArr.push('../images/day'+d+'/littleapple/apple'+(index+1)+'.png');
			if(index == n-1){
				$(this).find('img').addClass('dApple');
				$(this).css({"width":"3.11em","z-index":"7","left":tdayPosition[d-1].left,"top":tdayPosition[d-1].top});
			};
			$('.chatDiv').find('img').attr('src','../images/day'+n+'/chat.png');
			$('.chatDiv').css({left:chatPosition[d-1].left,top:chatPosition[d-1].top});
		});
		$('.appleDiv').each(function(index,element){
			var This = $(this);
			This.find('.img').click(function(){
				Index = $(this).index('.appleImg');  //根据图片的index去找对应的数据  ---非今天
				
				switch (datas[Index].s) {
					case 1 :
						switch (datas[Index].pi){
							case 0 :  //音乐
								var tns = datas[Index].pn.split(',');
								$('.music').show();
								$('#mask').show();
								$('.music').find('.sing').attr('autoPlay','autoPlay').attr('src',datas[Index].pd);							
								if(sing.paused){
									sing.play();
									play.attr('src','../images/play.png');
								};
								$('.music').find('.musicName').html(tns[0]);
								$('.music').find('.songerName').html(tns[1]);
							break;
							case 1 :  //福字，财神，豪车
							case 2 :
							case 3 :
								$('.static').show();
								$('#mask').show();
								$('.static').find('.prize').attr('src','../images/'+datas[Index].pi+'.png');
							break;
							case 4 :  //大众点评优惠券
								reInCard('.dazhong');
							break;
							case 5 :  //格瓦拉电影票
								reInCard('.gewala');
							break;
							case 6 :  //蚂蜂窝优惠券
								reInCard('.mafengwo');
							break;
							case 7 :  //魔鬼猫优惠券
								reInCard('.moguimao');
							break;
							case 8 :  //鲜生活的优惠券
								reInCard('.xianshenghuo');
							break;
							case 9 :  //京东优惠券
								$('.jingdong').show();
								$('#mask').show();
								$('.jingdong').find('.text').html(jdText[datas[Index].ri-1]);
								$('.jingdong').find('.jdlianjie').attr('href',jdUrl[datas[Index].ri-1]);
							break;
							case 10 :
							toast('魔鬼猫公仔',2600);
							break;
							case 11 :
							toast('CD',2600);
							break;
							case 12 :						
								$('.addressInfo').show();
								$('#mask').show();
								dataInfo = {
													"d": "新疆",
													"pc": "999999",
													"a": "小岗村成败区成功大道666号",
													"n": "王大雷",
													"ph": "18888888888"
												}
								
								$('.addressInfo').find('.prizeImg').attr('src','../images/'+datas[Index].pi+'.png').css({'width':'60%','margin':'0 20%'});
								$('.addressInfo').find('.nameInfo').html(dataInfo.n);
								$('.addressInfo').find('.phoneInfo').html(dataInfo.ph);
								$('.addressInfo').find('.areaInfo').html(dataInfo.d);
								$('.addressInfo').find('.addrInfo').html(dataInfo.a);
							break;
							case 13 :
							toast('M5P',2600);
							break;
							case 14 :
							toast('耳机',2600);
							break;
							case 15 :
								$('.xianjin').show();
								$('#mask').show();
								if(datas[Index].pn){  //填写了
									$('.xianjin').addClass('pf');
									$('.xianjin').find('.hongbaoForm').hide();
									$('.xianjin').find('.hasHongbao').show();
									$('.xianjin').find('.inaddress').eq(1).show();
									$('.xianjin').find('.inaddress').eq(0).hide();
									$('.xianjin').find('.hasNum').html(datas[Index].pn);
								}else{  //没填
									$('.xianjin').find('.hongbaoForm').show();
									$('.xianjin').find('.hasHongbao').hide();
									$('.xianjin').find('.inaddress').eq(0).show();
									$('.xianjin').find('.inaddress').eq(1).hide();
								};								
							break;
							case 16 :
								$('.chongzhi').show();
								$('#mask').show();
								if(datas[Index].pn){  //填写了
									$('.chongzhi').addClass('pf');
									$('.chongzhi').find('.hongbaoForm').hide();
									$('.chongzhi').find('.hasHongbao').show();
									$('.chongzhi').find('.inaddress').eq(1).show();
									$('.chongzhi').find('.inaddress').eq(0).hide();
									$('.chongzhi').find('.hasNum').html(datas[Index].pn);
								}else{  //没填
									$('.chongzhi').find('.hongbaoForm').show();
									$('.chongzhi').find('.hasHongbao').hide();
									$('.chongzhi').find('.inaddress').eq(0).show();
									$('.chongzhi').find('.inaddress').eq(1).hide();
								};
							break;
							case 17 :
								$.ajax({
									url: 'http://10.8.8.146/lockimage/getAddr.do?u=123&s=1EB42761530C62774BEA8C140F07969A&ri=2&callback=fn',
									type: 'GET',
									dataType: 'jsonp',
									jsonp:"callback",
									jsonpCallback:"hander",
									//data: {},
									success: function(data){
										console.log(data.d);
									},
									error:function(){
										
									}
								});
							break;	
						};
					
					break;
					case 2 :
						toast('已过期',2600);
					break;
					case 3 :
						toast('明天再来',2600);
					break;	
				}
				
				
				//datas[Index].s == 0 今天未抽奖 1 已中奖  ---点击今天发送一个请求
				if(datas[Index].s == 0){
					if($(this).hasClass('dApple')){          //今天 
						//发送ajax请求
						$(this).removeClass('dApple')
						$(this).parent('div').css({'transform':'scale(0)'});
						var _this = $(this);
						setTimeout(function(){
							_this.parent('div').css({'transform':'scale(0.75)'});
							_this.attr('src','../images/day'+d+'/littleapple/apple'+(index+1)+'-gray.png');	
							imagesArr.push('../images/day'+d+'/littleapple/apple'+(index+1)+'-gray.png');
							$('.chatDiv').hide();
						},500);
					};
				};
				
				
			});
		});	
	};
	imagesArr.push('../images/day'+n+'/chat.png');
	imagesArr.push('../images/base.jpg');
	imagesArr.push('../images/boy.png');
	imagesArr.push('../images/sownman.png');
	imagesArr.push('../images/sidai.png');
	imagesArr.push('../images/sidai1.png');
	imagesArr.push('../images/sidai2.png');
	imagesArr.push('../images/money.png');
	imagesArr.push('../images/logo.png');
	imagesArr.push('../images/word.png');
	imagesArr.push('../images/star1.png');
	imagesArr.push('../images/star2.png');
	imagesArr.push('../images/redwallet.png');
	loadImg();
	function loadImg() {
		var oLoading = document.getElementById('loading');
		var imgArr = imagesArr;
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
	
	
	$('.get').on('click',function(){
		$(this).parent('div').hide();
		$('.shaddress').show();	
	});
	$('.shaddress').find('.close-button').on('click',function(){
		$(this).parent('div').hide();
		//pid	
	});
	var rePhone = /^\d{11}$/;
	$('.shaddress').find('.addressCon').on('click',function(){
		var mesgArr = ['请输入收货人','请输入联系方式','请输入所在地区','请输入详细地址'];
		$('.inText').each(function(index,element){
            if($(this).val() == ''){
				toast(mesgArr[index],2600);
			};
			if($('.formNum').val() != ''){
				if(!rePhone.test($('.formNum').val())){
					toast('输入正确的手机号格式',2600);
				};
			};
        });
	});
	/*修改收货信息*/
	$('.xiugai').click(function(){
		$(this).parent('div').hide();	
		$('.shaddress').show().addClass('pa');
		if(dataInfo){
			$('.shaddress').find('.formPerson').val(dataInfo.n);
			$('.shaddress').find('.formNum').val(dataInfo.ph);
			$('.shaddress').find('.formArea').val(dataInfo.d);
			$('.shaddress').find('.formAddress').val(dataInfo.a);
		}
	});
	/*输入检测*/
	var re = /^\d+$/;
	$('.phoneNum').on('blur',function(){
		if(re.test($(this).val())){
			$('.phoneNum').addClass('white');
			$('.phoneCon').addClass('yellow');
		}else{
			$('.phoneNum').removeClass('white');
			$('.phoneCon').removeClass('yellow');
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
	function clearInput(_this,obj){
		if(_this.parent('div').find(obj).val() != ''){
			_this.parent('div').find(obj).val('');	
		};
	};
	function reInCard(obj){
		$(obj).show();
		$('#mask').show();
		$(obj).find('.text').html(datas[Index].pd);	
	};
});