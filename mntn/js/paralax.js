let header = document.querySelector("#start");
let pImg=document.querySelector("#img-1");
let pImg2=document.querySelector("#img-2");
let kMountain=0.03;
let kHuman=-0.06;
header.addEventListener("mousemove",function(e){
    posX=e.clientX;
    posY=e.clientY;
    pImg.style.transform="translateX("+posX*kMountain+"px)";  
    pImg2.style.transform="translateX("+posX*kHuman+"px)";    

});