let btn = document.querySelector("#res-btn");
let btns = document.querySelector(".btn-wraper");
let menu = document.querySelector("#menu");
let toggleDrop = document.querySelector("#togle-dropdown");
let DropDown = document.querySelector(".dropdown");

btn.addEventListener("click", function () {
  menu.classList.toggle("hide");
});

toggleDrop.addEventListener("click", function () {
  DropDown.classList.toggle("hide-dropdown");
  this.classList.toggle("up");
  if (this.classList.contains("up")) {
    this.classList.remove("h-line");
  } else {
    this.classList.add("h-line");
  }
});
