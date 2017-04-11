$(document).ready(function(){
	var uid = getQueryString('u');
	var s = getQueryString('s');
	
	var resData;
	var resLevel;
	var resCode;
	var resNumber;
	var resDay;
	
	var num = 0;
	var btn = true;
	var cData;
	var sData;
	
	String.prototype.iphone = function(){
		return this.replace(/\d{1}(?=[\d\D]{4,7}$)/ig,"<span class='xing'>*</span>")
	};	
	
	//leaves
	(function(){
 		//树叶的总个数
		var count = 20; 
		//获取随机数
		function Random(s,e){return Math.random()*(e-s)+s;};
		//循环创建树叶的dom元素
		var fragment = document.createDocumentFragment();
		for(var i = 0 ; i < count; i ++) {
			var div = document.createElement("div");
			div.className = 'leaves';
        	div.innerHTML = '<img src="images/f_'+(Math.round(Random(1,5)))+'.png" alt="">';
        	fragment.appendChild (div);
		};
		//添加到body里
		document.querySelector("#content").insertBefore(fragment,document.querySelector("#content .flagsWrap"));
		//给每个树叶添加animation动画，并设置随机的参数
 		var leaves = document.querySelectorAll('.leaves');
		Array.prototype.forEach.call(leaves,function(o,i){
  			var time1 = Random(5,10);   //树叶总共落下的时间
			var time2 = Random(0,5);    //每个树叶的延时时间
			var time3 = Random(1,3);    //每个树叶的摇摆的时间
			//随机设置left，根据浏览器宽度设置最大值
 			o.style.left = Random(0,16) +'rem';
			//设置animation属性，为了兼容添加了前缀，总共时间和延时时间随机获取
			o.style.animation = o.style.WebkitAnimation = 'fade '+time1+'s '+ time2+'s linear,move '+time1+'s '+ time2+'s linear';
			//设置里面图片的animation属性，设置时间，并设置翻转
			o.children[0].style.animation = o.children[0].style.WebkitAnimation = Math.round(Random(0,1)) ? 'rotate '+time3+'s ease-in-out infinite alternate' : 'rotate1 '+time3+'s ease-in-out infinite alternate';
		})
		setTimeout(function () {
			Array.prototype.forEach.call(leaves,function (o,i) {
				o.parentNode.removeChild(o);	
			});	
		},20000);
	})();
	
	//点击活动规则
	$(".ruleWrap").click(function(){
		if(btn){
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
		url: '/active/syear2017/search.php',
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
			resNumber = data.number;
			resDay = data.day || "1";
			
			if(data.st == "2"){  //活动正常
				
				//剩余抽奖次数
				$(".remaintime").html(data.num);
				
				//根据当前日期去加载对应的欢迎对联
				(function(){
					changeImg (resDay,1);
					changeImg (resDay,2);
					function changeImg (day,index) {
						var oImg = new Image();
						oImg.src = "images/t_"+resDay+"_"+index+".png";
						oImg.onload = function(){
							$(".titleWrap"+index).find("img").attr("src","images/t_"+resDay+"_"+index+".png");
							$(".titleWrap"+index).addClass("active");		
						};	
					}	
				})();
				
				//根据当前日期判断赞助商logo
				(function(){
					var ds = [{"name":"迷彩虎","url":"http://down.micaiying.net/2.0.3.4/wap_micaihu_jinlisuoping_index.apk"},{"name":"美豆直播","url":"http://apks-10028005.file.myqcloud.com/HL/CJ_jinli/medou_CJ_jinli.apk"},{"name":"一条","url":"http://7xwvdy.com1.z0.glb.clouddn.com/app1.5-jinli-newyear.apk"},{"name":"星美生活","url":"http://xmlife.smi170.com/resources/activty/offline/jinli"},{"name":"网易漫画","url":"http://pr.da.netease.com/receiver/?action=ad&camName=1484214919566&target=https%3A%2F%2Feasyread.nosdn.127.net%2Fdl%2Fwymh%2Fandroid%2F2.6.0%2Fpstore_jinli_2.6.0.apk&sid=-955688120"}];
					var $nodes = $(".thIconWrap .apk");
					if(parseInt(resDay) > 3){
						$nodes.each(function(index,element){
							$(element).find("img").attr("alt",ds[index].name)
												  .attr("data-href",ds[index].url)
												  .attr("src","images/one_"+(index+1)+".png")
												  .attr("data-id",(6+index));
							$(element).find("span").html(ds[index].name);				  
						});
					}	
				})();
				
				//抽奖代码
				var $list = $('.gridWrap .list');
				var $start = $('.gridWrap .start');
				
				var level = 8;
				var cLevel = 8;
				
				$start.click(function(){
					if(!btn)return;
					
					$("#toast").hide();
					if(parseInt(resNumber) > 0){
						$start.addClass('gray');
						
						//在此处写ajax即可
						$.ajax({
							url: '/active/syear2017/click.php',
							type: 'POST',
							dataType: 'json',
							timeout:60000,
							data:{
								uid:uid,
								s:s
							},
							success: function(data){
								cData = data;
								resNumber = data.number;//剩余次数
								cLevel = parseInt(data.level);
								level = parseInt(data.level) || 8;
								if(data.level == "9" || data.level == "10" || data.level == "11" || data.level == "12"){
									level = 3;
								}
								resCode = data.prize;	
								$(".remaintime").html(data.num);	
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
						
						var t1 = Date.now();
						raffleInit(level,function(n){
							setTimeout(function(){
								console.log("恭喜你获得了："+(n)+' 等奖');
								console.log((Date.now() - t1)/1000);
								$start.removeClass('gray');
								btn= !btn;	
							},100);
							
							//在此处写抽奖结束后的代码,参数n就是中奖的level
							switch (parseInt(cLevel)) {
								case 2:
								case 4:
								case 6:
								case 7:
									//地址	
									setTimeout(function(){
										$("#mask").show();
									},100);
									$(".lingqu").css("display","block").addClass("active");
									$(".lingqu").find("img").eq(0).attr("src","images/l_"+cLevel+".png");
									
									if(parseInt(cLevel) == 4){
										$(".lingqu").find("img").eq(0).css("height","10rem");
										$(".lingqu .introproduct").show();
									}else{
										$(".lingqu").find("img").eq(0).css("height","11.7rem");	
									}
								break;
								case 1:
								case 5:
								case 9:
									//券码
									setTimeout(function(){
										$("#mask").show();
									},100);
									$(".quan").css("display","block").addClass("active");
									$(".quan").find("img").eq(0).attr("src","images/l_"+cLevel+".png");
									if(parseInt(cLevel) == 1){
										$(".quan").find("img").eq(0).css("height","10rem");
										$(".dy").show();
									}else if(parseInt(cLevel) == 5){
										$(".quan").find("img").eq(0).css("height","8.9rem");
										$(".quan").find(".jinli .introurl").html(cData.prize);
										$(".jinli").show();
									}else if(parseInt(cLevel) == 9){
										$(".quan").find("img").eq(0).css("height","10rem");
										$(".quan").find(".wy .introurl").html(cData.prize);
										$(".wy").show();
									}
								break;
								case 3:
								case 10:
								case 11:
								case 12:
									//手机号码
									setTimeout(function(){
										$("#mask").show();
									},100);
									$(".chongzhi").css("display","block").addClass("active");	
									$(".chongzhi").find("img").eq(0).attr("src","images/l_"+cLevel+".png");	
								break;
								case 8:
									fail(2);
								break;
							}
							
						});
						btn= !btn;	
					}else{
						//今日机会用完了
						fail(3);
					}	
				});
				
				var timer = null,now = $list.length - 1,count = 0,startOff = true,s = 200;  
				function raffleInit(){
					var endnum = arguments[0]-1;
					var cb =arguments[1];
					clearInterval(timer)
					timer = setInterval(function(){
						startGo();
					},s);
					function startGo(){
						
						endnum = level - 1;//将等级设置为延时后的值
						
						if(!startOff){
							cb(endnum+1)
							clearInterval(timer);
							count = 0,startOff = true,s = 180;
							return false;
						};
						for(var i=0;i<$list.length;i++){
							$list.eq(i).removeClass('active');
						};
						now++;
						now = now++%$list.length;
						if(now %$list.length == 0) {
							count++;   //计算圈数
						};
						
						$list.eq(now).addClass('active');
						if(count>=1 && count<7){
							clearInterval(timer);
							s *= 0.96;
							timer = setInterval(function(){
								startGo();
							},s);
						};
						if(count>7){
							clearInterval(timer);
							s *= 1.08;
							timer = setInterval(function(){
								startGo();
							},s);
							if(s>260 && (now == endnum)){
								startOff = false;
							};
						};
					};
				};
				
				/*点击中奖纪录*/
				$(".recordWrap").click(function(){
					if(btn){
						$('#toast').hide();
						//此处ajax获取中奖记录
						$('.load').show();
						$.ajax({
							url: '/active/syear2017/search.php',
							type: 'POST',
							dataType: 'json',
							timeout:60000,
							data:{
								uid:uid,
								s:s
							},
							success: function(data){
								sData = data;
								var datas = data.level;
								if(datas.length){
									//根据返回的长度来填充内容
									var html = "";
									if(datas.length == 1){
										html += "<li class='p1'>";
										html += createHtml(datas[0]);	
										html += "</li>";
										$(".pinner").html(html);
										$("#mask,.pw").show();
									} else {
										for (var i=0;i<datas.length;i++) {
											html += "<li class='p"+(i+1)+"'>";
											html += createHtml(datas[i]);	
											html += "</li>";
										}
										$(".pinner").html(html);
										$(".lr").show();
										$(".cleft").hide();	
										$("#mask,.pw").show();
										$(".cright").click(function(){
											$(".pinner").css("left","-13.6rem");
											$(".cright").hide();
											$(".cleft").show();	
										});
										$(".cleft").click(function(){
											$(".pinner").css("left","0");	
											$(".cright").show();
											$(".cleft").hide();	
										});
									}
									
									/*点击修改*/
									$('.xiugai').click(function(){
										$('.pw,.lr').hide();	
										$('.inAddressWrap').show();
										
										$('.inText').eq(0).val(sData.name);
										$('.inText').eq(1).val(sData.phone);
										$('.inText').eq(2).val(sData.adrs);
										
									});
									
								}else{
									fail(1);
								}
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
					};
				});
				
				
			}else if(data.st == "3"){
				$(".remaintime").html("0");
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
		$('#mask,.lr').hide();
								
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
	
	function createHtml (num) {
		var html = "";
		switch (num) {
			case 2:
			case 4:
			case 6:
			case 7:
				//地址
				html += '<div class="shouhuo tc">收货信息</div>\
						 <img src="images/l_'+num+'.png" alt="奖品" class="img prizeImg" style="'+(num==4?"7.825":"9.1")+'rem">\
						 <div class="namePhone" style="margin-top:0.1rem;">\
							<span class="nameInfo">'+sData.name+'</span>&nbsp; \
							<span class="phoneInfo">'+sData.phone+'</span>\
						 </div>\
						 <div class="otherInfo">\
							<span class="addrInfo">'+sData.adrs+'</span>\
						 </div>\
						 <input type="button" value="修改收货信息" class="xiugai">\
						 <p>活动规则</p>\
						 <p>1、中国大陆地区（除去港澳台、西藏、新疆等快递邮寄不到的偏远地址）均可参加此活动；</p>\
						 <p>2、此活动真实有效，并且不收取任何快递等费用； </p>\
						 <p>3、最终解释权归金立锁屏所有！</p>'; 
				
			break;
			case 1:
			case 5:
			case 9:
				//券码
				html += '<img src="images/l_'+num+'.png" alt="券码" class="img" style="height:'+(num == 5 ? "8.9" : "10")+'rem; width:90%; margin:0rem 5% 0;">';
				if(num == 1){
					html += '<div class="introproduct tc dy" style="font-weight:bold;">\
								<span class="introtext">购票地址:</span><span class="introurl" style="font-size:0.4rem;"><a href="http://xmlife.smi170.com/resources/activty/offline/jinli" target="_blank">http://xmlife.smi170.com/resources/activty/offline/jinli</a></span>\
							 </div>';
				} 
				if(num == 5){
					html += '<div class="introproduct tc jinli" style=" font-weight:bold; letter-spacing:0.1rem;">\
								<span class="introtext">兑换码：</span><span class="introurl">'+sData.prize+'</span>\
							 </div>\
							 <div class="text jinli">50元全场通用的购机劵 ，请截图保存<br/>使用规则：进入金立官网购买手机，M2017不参与<br/>使用时间：2017.2.27-2017.3.27</div>\
							 <a href="http://www.gionee.com/" target="_blank" class="golook db jinli"></a>';	
				}
				if(num == 9){
					html += '<div class="introproduct tc wy" style="font-weight:bold; letter-spacing:0.1rem;">\
								<span class="introtext">兑换码：</span><span class="introurl">'+sData.prize+'</span>\
							 </div>\
							 <a href="https://h5.manhua.163.com/gift_code/redeem_form" target="_blank" class="goexchange db wy"></a>';
				}
				html += '<span class="inaddress tc db" style=" width:100%; display:block;color:rgba(0,0,0,.6);margin:0.2rem auto; top:-0.1em;font-size:0.5rem;">欢迎联系我们的QQ群：142876462</span>';
			break;
			case 3:
			case 10:
			case 11:
			case 12:
				//手机号码
				html += '<img src="images/l_'+num+'.png" alt="奖品" class="img prize" style="width:90%; margin:0 5% 0.4rem; height:11rem;">\
						 <div class="hasHongbao">\
    					 中奖号码为&nbsp;<span class="hasNum">'+sData.phone+'</span>\
    					 </div>\
						 <span class="inaddress tc" style=" position:relative; top:-1.4em;">欢迎联系我们的QQ群：142876462</span>';
				
			break;
			case 8:
				html += '<img src="images/fail_1.png" alt="遗憾" class="img" style="height:12rem; width:90%; margin:0 5%;">';
			break;
		}	
		return html;
	}
	
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