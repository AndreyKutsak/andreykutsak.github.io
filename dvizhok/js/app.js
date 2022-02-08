$(".owl-carousel").owlCarousel({
  autoplay: true,
  autoplayTimeout: 4000,
  loop: true,
  margin: 10,
  ceneter: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 3,
    },
  },
});
