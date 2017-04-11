var a;
function fontSize() {
	a = document.documentElement.clientWidth;
	a = a > 640 ? 640 : a;
	document.getElementsByTagName("html")[0].style.fontSize = a / 16 + "px";
	
}
fontSize();
document.addEventListener('DOMContentLoaded', function() {
	document.body.style.cssText = "overflow: hidden; height: 100%; font-size:"+(a/16)+"px";
	;
	!
	function() {
		var c = document.createElement('span');
		c.id = 'span1span';
		c.style.fontSize = '1em';
		document.body.appendChild(c);
		if (parseFloat(getStyle(document.getElementById('span1span'), 'fontSize')) != parseFloat(document.getElementsByTagName('html')[0].style.fontSize)) {
			var n = parseFloat(getStyle(document.getElementById('span1span'), 'fontSize')) / parseFloat(document.getElementsByTagName('html')[0].style.fontSize);
			document.getElementsByTagName("html")[0].style.fontSize = parseFloat(document.getElementsByTagName('html')[0].style.fontSize) / n + "px"
		};

		function getStyle(a, b) {
			if (a.currentStyle) {
				return a.currentStyle[b]
			} else {
				return getComputedStyle(a, false)[b]
			}
		}
	}()
}, !1);