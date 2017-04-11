// JavaScript Document
window.onload = function(){
	var oA = document.getElementsByTagName("img")[1];
	var oSp = document.getElementById("sel");
	var oUl = document.getElementById("select");
	var aLi = oUl.children;	
	var b = true;
	
	oA.onclick = function(){
		if(b){
			oUl.style.display = "block";
			oUl.style.overflowY = "auto";
			b = false;	
		}else{
			oUl.style.display = "none";
			b = true;		
		}
	}
	for(var i=0;i<aLi.length;i++){
		aLi[i].index = i;
		(function(i){
			aLi[i].onclick = function(){
				oSp.innerHTML = aLi[i].innerHTML;
				oUl.style.display = "none";	
				b = true;
			}		
		})(i)	
			
	}
	
}