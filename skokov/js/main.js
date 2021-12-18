
(function(){
	let btn=document.querySelector(".responsive-btn");
let menu=document.querySelector(".menu-wraper");
btn.addEventListener("click",function(){
	menu.classList.toggle("active");
	btn.classList.toggle("clicked")
})
let links=document.querySelectorAll(".head-link");
links.forEach(function(i){
	i.addEventListener('click',function(){
		let el=i
		console.log(i);
		let w=this.offsetWidth;
		this.style.width=w+"px";
	})
})
//about container auto resize
let img=document.querySelector(".prof-wraper .img-wraper img");
let container=document.querySelectorAll(".prof-wraper");
let height=img.clientHeight;
let width=img.clientWidth;
container.forEach(function(index){
	console.log("i");
	index.style.width=width+"px";
	index.style.height=height+"px"
})
function setWidth(a,b){
let width=a.clientWidth;
	b.forEach(function(index){
		console.log(a);
		index.style.minWidth=width+"px";
	
	})
}
slider
let slWindow=document.querySelector(".slider-wraper");
let slide=document.querySelectorAll(".slide");
setWidth(slWindow,slide);
console.log(slide);
})();