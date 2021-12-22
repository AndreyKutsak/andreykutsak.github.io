window.onload = function () {
  let menu = document.getElementById("menu");
  document.addEventListener("click", function (e) {
    let el = e.target.id;
    if (el === "responsive-btn") {
      menu.classList.toggle("hide");
    }
  });
};
