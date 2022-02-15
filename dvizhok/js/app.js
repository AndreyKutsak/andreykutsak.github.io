$(document).ready(function () {
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
			480: {
				items: 2,
			},
			800: {
				items: 3,
			},

			1000: {
				items: 4,
			},
		},
	});
	$("#orderBtn").on("click", function () {
		$(".modal-bg").toggleClass("hide");
	});
	$(".races-item").on("click", function () {
		let dataVal = $(this).data();

		$("#orderDate").val(dataVal.race);
		console.log($("#orderDate").val());
		$(".modal-bg").toggleClass("hide");
	});
	$(".questionnaire").on("click", function (e) {
		e.stopPropagation();
	});
	$(".modal-bg").on("click", function (e) {
		$(".modal-bg").toggleClass("hide");
	});
	setTimeout(function () {
		$(".promo").addClass("active");
	}, 2000);
	$(".close-btn").on("click", function () {
		$(".promo").toggleClass("active");
	});
	// toggle menu
	$("#toggleBtn").on("click", function () {
		$(this).toggleClass("clicked");
		$("#headerMenu").toggleClass("hide-menu");
	});
	$(".menu-item").on("click", function () {
		$("#headerMenu").toggleClass("hide-menu");
		$("#toggleBtn").toggleClass("clicked");
	});
	// call btn
	setTimeout(function () {
		$(".call-btn").toggleClass("hide-btn");
	}, 4000);
	$(".call-btn").on("click", function () {
		$(".call-btn-form").removeClass("hide-form");
	});
	$("#closeBtnForm").on("click", function (e) {
		e.stopPropagation();
		$("#callBtnForm").addClass("hide-form");
	});
});
