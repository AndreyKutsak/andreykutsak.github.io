$("#slider").owlCarousel({
	autoplay: true,

	autoplayTimeout: 4000,
	loop: true,

	nav: false,
	dots: false,
	navText: ["", ""],
	responsive: {
		0: {
			items: 1,
			margin: 0,
		},
		800: {
			items: 4,
			nav: false,
			margin: 25,
		},
	},
});
