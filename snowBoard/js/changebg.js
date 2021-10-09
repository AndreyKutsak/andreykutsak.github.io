(function(){
	const header=document.querySelector('.header-bg');
	const imgArr=["head-bg2","head-bg1"];
	var i=0;

	function changeBG() {
	
		i++;
		if (i>imgArr.length-1) {
			i=0;
		}
		header.style.backgroundImage="url(img/"+imgArr[i]+".jpg)";
		
	}
	setInterval(function(){
		changeBG();
	},4000)
})();