let toggleBtn = document.querySelector("#toggleBtn");
let toggleMenu = document.querySelector("#toggleMenu");
let buttons = Array.from(document.querySelectorAll(".btn"));
let modalBg = document.querySelector(".modal-window");

// responsive menu
toggleBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  e.currentTarget.classList.toggle("active");
  toggleMenu.classList.toggle("hide");
});
// modal-window
modalBg.addEventListener("click", (e) => {
  e.stopPropagation();
  e.currentTarget.classList.add("hide");
  console.log(e.target.children);
  Array.from(e.target.children).forEach((el) => {
    el.classList.add("hide");
  });
});
buttons.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    let targets = e.target.dataset.target || false;
    if (targets) {
      let el = Array.from(document.querySelectorAll(targets));
      el.forEach((item) => {
        item.classList.toggle("hide");
      });
    }
  });
});
