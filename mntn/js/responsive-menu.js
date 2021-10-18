let btn=document.querySelector("#btn");
let menu=document.querySelector("#menu");
btn.addEventListener("click",function(e){
    e.preventDefault();
    menu.classList.toggle("hide");
})