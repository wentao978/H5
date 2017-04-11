$(document).ready(function(){
	var u = getQueryString('u');
	var s = getQueryString('s');
	var t = getQueryString('t');
	var imagesArr = ['images/diti.jpg','images/button.png','images/loading.gif','images/button1.png','images/button2.png','images/close-button.png','images/tip1.png','images/tip2.png'];
	var questionId;
	$.ajax({
		url: '/lockimage/getQuestion.do',
		type: 'GET',
		dataType: 'json',
		timeout:60000,
		data:{
			u:u,
			s:s,
			t:t
		},
		success: function(data){
				
		},
		error:function(jqXHR, textStatus, errorThrown){
			//$('.load').hide();
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
	
	//$('.load').show();
	$('.answer').find('.ans').each(function(index,element){
        $(this).click(function(){
			alert($(this).data('answer'));	
		});
    });
	
	$('.change-img').click(function(){
		alert(iNow++);	
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
	
	function clearInput(_this,obj){
		if(_this.parent('div').find(obj).val() != ''){
			_this.parent('div').find(obj).val('');	
		};
	};
	function reInCard(obj){
		if(today){
			$(obj).show();
			$('#mask').show();
			$(obj).find('.prize').attr('src','images/'+today.pi+'.png')
			$(obj).find('.text').html(today.pd);	
		}else{
			$(obj).show();
			$('#mask').show();
			$(obj).find('.prize').attr('src','images/'+datas[Index].pi+'.png')
			$(obj).find('.text').html(datas[Index].pd);	
		}
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