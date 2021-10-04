let link=document.querySelectorAll(".link");
link.forEach(function(k){
    k.addEventListener("click",function(e){
        link.forEach(function(k){
            k.parentNode.classList.remove("active");
        });
        k.parentNode.classList.add("active")
        e.preventDefault();
        let atrVal=e.target.getAttribute("href");
        let el=document.querySelector(atrVal);        
        el.scrollIntoView({block: "center", behavior: "smooth"}); 
    })
})
