let sliderItem = document.querySelectorAll(".slider-item>a"),
  slideWindow = document.querySelector("#sl-window"),
  slides = document.querySelectorAll(".slide"),
  slideHeight = slides[0].innerHeight;

count = 0;

sliderItem.forEach(function (k) {
  k.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(e);
    sliderItem.forEach(function (k, i) {
      k.classList.remove("active");
      console.log(i);
    });
    e.target.classList.add("active");
  });
});
