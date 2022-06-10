let text=document.querySelector("#draw");
window.addEventListener("deviceorientation", function(e){
  console.log(e)
text.innerHTML=`absolute ${e.absolute} <br> alpha ${e.alpha}
  <br> betta ${e.beta} 
  <br> gamma  ${e.gamma}`
}, true);