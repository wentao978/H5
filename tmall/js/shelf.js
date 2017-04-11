// JavaScript Document
//注释第一次的效果
/*window.onload = function(){
	over('ul1');
	over('ul2');
	over('ul3');
	var oUl = document.getElementById('ul1');
	var aLi = oUl.children;
	aLi[0].over('ul1');	
}
function over(id){
	var oUl = document.getElementById(id);
	var aLi = oUl.children;	
	
	for(var i=0;i<aLi.length;i++){
		aLi[i].index = i;
		aLi[i].b = true;
		(function(i){
			aLi[i].ontouchend = function(){
				var aImg = aLi[i].getElementsByTagName("img")[1];
				var aP = aLi[i].getElementsByTagName("p")[0];
				if(this.b){
					aImg.style.display = "block";
					aP.style.opacity = 0.3;
					aP.style.filter = 'alpha(opacity=30)';
					this.b = false;
				}else{
					aImg.style.display = "none";
					aP.style.opacity = 1;
					aP.style.filter = 'alpha(opacity=100)';
					this.b = true;
				}
			}		
		})(i);
	}	
	
}*/
//重新写一下
window.onload = function(){
	var oUl = document.getElementById("ul1");
	var aLi = oUl.children;
	var iNow = 0;
	
	for(var i=0;i<aLi.length;i++){
		aLi[i].index = i;
		
		aLi[i].ontouchend = function(){
			for(var i=0;i<aLi.length;i++){
				
				if(i == this.index){//当前选中的那个
					aLi[i].getElementsByTagName("img")[1].style.display = "block";
					aLi[i].getElementsByTagName("p")[0].style.opacity = 0.3;
					aLi[i].getElementsByTagName("p")[0].style.filter = 'alpha(opacity = 30)';
				}else{
					aLi[i].getElementsByTagName("img")[1].style.display = "none";
					aLi[i].getElementsByTagName("p")[0].style.opacity = 1;
					aLi[i].getElementsByTagName("p")[0].style.filter = 'alpha(opacity = 100)';					
				}
				
			}	
		}	
		aLi[iNow].getElementsByTagName("img")[1].style.display = "block";
		aLi[iNow].getElementsByTagName("p")[0].style.opacity = 0.3;	
		aLi[iNow].getElementsByTagName("p")[0].style.filter = 'alpha(opacity = 30)';		
	}
	
}