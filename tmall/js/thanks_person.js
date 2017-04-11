// JavaScript Document
window.onload = function(){
	var oDiv = document.getElementById("heart3");
	var oUl = document.getElementsByTagName("ul")[0];	
	var w1 = oDiv.offsetHeight;
	var w2 = oUl.offsetHeight;
	var timer = null;
	var timer2 = null;
	var iNow = 0;
	var iNow2 = 0;
	
	if(w2 < w1){
		var aLi = oUl.children;
		var oneHeight = aLi[0].offsetHeight;
		var H = 0;
		for(var i = 0;i<aLi.length;i++){
			H += oneHeight;
		}
		aLi[0].style.marginTop = (w1-H)/2+ 'px';
	}
	
	setTimeout(function(){
		
		if(w2 > w1){
			var w = w2 - w1;
			timer = setInterval(function(){
				
				start();
				
			},500);
			
		}
		function start(){
			iNow ++;
			oUl.style.top = -12*iNow + 'px';
			
			if(Math.abs(parseInt(oUl.style.top)) > Math.abs((-w-w1 ))){
					iNow2 = 0;
					oUl.style.top = w1+ "px";
					clearInterval(timer);
					timer2 = setInterval(function(){
						reStart();	
					},500);
					
		};
		
		function reStart(){
			iNow = 0;
			iNow2++;
			oUl.style.top = (w1 - 12*iNow2) + 'px';
			if(parseInt(oUl.style.top) < 0){
				clearInterval(timer2);
				timer = setInterval(function(){
					start();	
				},500);
			}
			
			
		   }
		}
			
		
	},1000);

}