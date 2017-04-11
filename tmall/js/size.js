function fontSize(){
	var iWidth=document.documentElement.clientWidth;
	iWidth = iWidth>640?640:iWidth;
	document.getElementsByTagName("html")[0].style.fontSize=iWidth/16+"px";
}
fontSize();  
function hengshuping(){
  if(window.orientation==180||window.orientation==0){setTimeout(function(){fontSize();},100);};
  if(window.orientation==90||window.orientation==-90){setTimeout(function(){fontSize();},100);};
}

//屏幕方向标识，0横屏，其他值竖屏
var orientation=0;
//转屏事件，内部功能可以自定义
function screenOrientationEvent(){
	hengshuping();
}
var innerWidthTmp = window.innerWidth;
//横竖屏事件监听方法
function screenOrientationListener(){
	try{
		var iw = window.innerWidth;
		//屏幕方向改变处理
		if(iw != innerWidthTmp){
			if(iw>window.innerHeight){
				orientation = 90;
			}else{ 
				orientation = 0;
			}
			//调用转屏事件
			screenOrientationEvent();
			innerWidthTmp = iw;
		}
	}catch(e){
		throw new Error('转屏时发生错误');
	};
	//间隔固定事件检查是否转屏，默认100毫秒
	setTimeout("screenOrientationListener()",100);
}
//启动横竖屏事件监听
screenOrientationListener();