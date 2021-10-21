let btn = document.querySelector("#btn"),
  menu = document.querySelector("#menu-wraper"),
  linkReg = new RegExp(/#[a-z0-9]/, "g"),
  link = document.querySelectorAll(".head-link");
function remClass(elemnts, className) {
  link.forEach(function (k) {
    k.classList.remove("active");
  });
}
document.addEventListener("click", function (e) {
  e.preventDefault();
  let el = e.target;
  switch (el) {
    //toggle clases for btn and menu
    case el.closest("#btn") || el.closest(".slider-item"):
      btn.classList.toggle("clicked");
      menu.classList.toggle("hide");
    // get data from head link and scroll for ellement
    case el.closest(".head-link"):
      remClass(link, "active");
      el.classList.add("active");
      if (linkReg.test(el.getAttribute("href"))) {
        let targetEl = document.querySelector(el.getAttribute("href"));
        targetEl.scrollIntoView({ block: "center", behavior: "smooth" });
      }
  }
});
