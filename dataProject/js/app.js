$(document).ready(function () {
  if ($(window).width() < 992) {
    $(".menu-wraper").addClass("hide");
    $(".navbar-toggler").on("click", function () {
      $(".menu-wraper").toggleClass("hide", "show");
    });
  }
});
