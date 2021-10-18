let btn = document.querySelector("#btn"),
  menu = document.querySelector("#menu-wraper"),
  linkReg = new RegExp(/#[a-z0-9]/, "g");
btn.addEventListener("click", function () {
  menu.classList.toggle("hide");
});

let link = document.querySelectorAll(".head-link");

link.forEach(function (k) {
  k.addEventListener("click", function (e) {
    e.preventDefault();
    link.forEach(function (k) {
      k.classList.remove("active");
    });
    e.target.classList.add("active");
    let linkVal = e.target.getAttribute("href");
    if (linkReg.test(linkVal)) {
      let el = document.querySelector(linkVal);
      el.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  });
});
