let prevBtn=document.querySelector("#prew"),
nextBtn=document.querySelector("#next"),
slideWindow=document.querySelector(".carousel-window"),
slides=document.querySelectorAll(".slider-item"),
count=0;
sliderCenter=slides.length/2;
prevBtn.addEventListener("click",function(e){
  e.preventDefault;
  prewSlide();
  
});
nextBtn.addEventListener("click",function(e){
  e.preventDefault;
  nextSlide();
})
function removeOpaciti(el){
el.forEach(function(k){
  k.classList.remove("active");
})
}
function nextSlide(){
  removeOpaciti(slides)
  if(count>=slides.length/2){
    count=0;
    sliderCenter=slides.length/2;
  }
  else{
    count++;
    sliderCenter++;
  }
  slideWindow.style.transform="translateX(-"+slides[0].clientWidth*count+"px)";
  slides[sliderCenter].classList.add("active");
}
function prewSlide(){
  removeOpaciti(slides)
  if(count<=0){
    count=slides.length/2;
    sliderCenter=slides.length/2;
  }
  else{
    count--;
    sliderCenter--;
  }
  slideWindow.style.transform="translateX(-"+slides[0].clientWidth*count+"px)";  
  slides[sliderCenter].classList.add("active");
}