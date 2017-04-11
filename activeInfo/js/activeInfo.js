window.onload = function(){
	var oW = document.documentElement.clientWidth || document.body.clientWidth;
	var oH = document.documentElement.clientHeight || document.body.clientHeight;
	var oSh = document.documentElement.scrollHeight || document.body.scrollHeight;
	var oBg = document.getElementById("bg");
	var oLoading = document.getElementById('loading');
	var oLh = oSh > oH ? oSh : oH;
	oLoading.style.height = oLh + 'px';
	loadImg();
	set();
	
	window.onresize = function(){
		set();	
	}
	
	function set(){
		var oW = document.documentElement.clientWidth || document.body.clientWidth;
		var oH = document.documentElement.clientHeight || document.body.clientHeight;
		oBg.style.width = oW + 'px';
		oBg.style.height = oH + 'px';
		oBg.style.backgroundSize = 'cover';	
	}
	
	function loadImg() {
		var oLoading = document.getElementById('loading');
		var imgArr = ['bg.jpg','area1.png','area2.png','area3.png','area4.png','area4.png','kuai.png','kai.png','top-logo.png', 'hailiang.jpg','jieri.jpg','liangping.jpg','meitu.jpg' ];
		var num = 0;		
		for(var i=0;i<imgArr.length;i++){
			var Img = new Image();
			Img.src = 'images/'+ imgArr[i];
			Img.onload = function(){
				num++;
				if(num == imgArr.length){
					oLoading.style.display = 'none';
				}
			};
			Img.onerror = function(){
				oLoading.style.display = 'none';
			};
		}
	}
}