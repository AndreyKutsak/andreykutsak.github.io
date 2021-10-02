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

let link=document.querySelectorAll(".link");
let elem;
link.forEach(function(k){
    k.addEventListener("click",function(e){
        link.forEach(function(k){
            k.parentNode.classList.remove("active")
        });
        k.parentNode.classList.add("active")
        e.preventDefault();
        let atrVal=e.target.getAttribute("href");
        let el=document.querySelector(atrVal);
        
        el.scrollIntoView({block: "center", behavior: "smooth"});       
   

    })
})
let scroledTop;
window.addEventListener("scroll",function(e){
    console.log(document.querySelector("footer").offsetTop)
})

console.log(observer)
let sections=document.querySelectorAll("section");
sections.forEach(function(k){
    console.log(k.offsetTop);
    if(k.offsetTop){}
})
let el=document.querySelectorAll(".element");
let observer= new IntersectionObserver(alert("hello"), document);