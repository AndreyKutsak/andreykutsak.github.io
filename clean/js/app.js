$(document).ready(function () {
	$("#owl-carousel").owlCarousel({
		autoplay: true,
		autoplayTimeout: 100000,
		loop: true,
		margin: 10,
		mouseDrag: false,
		ceneter: true,
		nav: true,
		navText: ["", ""],
		items: 1,
		dots: false,
		responsive: {
			0: {
				nav: false,
			},
			800: {
				nav: true,
			},
		},
	});
	$("#owl-slider").owlCarousel({
		autoplay: true,
		autoplayTimeout: 4000,
		loop: true,
		margin: 10,
		center: true,
		nav: true,
		dots: false,
		navText: ["", ""],
		responsive: {
			0: {
				items: 1,
				margin: 0,
			},
			800: {
				items: 3,
				nav: false,
			},
		},
	});
});
// tooge header menu
$("#toggle-btn").click((e) => {
	$("#toggle-menu").toggleClass("hide");
});
let isMove = false;
// image cliping in slider
$(".photo-after").css({ "clip-path": `inset(0 0 0 49.5%)` });
let cutImage = () => {
	if (isMove) {
		$(".line").on("mousemove", (e) => {
			let xCord = (100 * (Number(e.clientX) - $(e.target).parent().offset().left)) / Number($(e.target).parent().innerWidth());
			$(e.target).css({ left: `${xCord}%` });
			$(".photo-after").css({ "clip-path": `inset(0 0 0 ${xCord}% )` });
			$(e.target).trigger("mousup");
			isMove = false;
		});
	}
};
$(".line").on("mousedown", (e) => {
	cutImage();

	isMove = true;
});
$(".line").mouseup(function () {
	isMove = false;
});
// acardion

$(".question-item").click((e) => {
	$(".question-item").removeClass("show");
	$(e.currentTarget).toggleClass("show");
});
