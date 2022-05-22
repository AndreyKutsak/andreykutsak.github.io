$(document).ready(function () {
	$("#srch-btn").click(() => {
		if ($("#srch-inp").val() == "") {
			$("#srch-inp").toggleClass("visible-search");
		}
	});
	$("#menu-btn").click(() => {
		$(".toggle-menu").toggleClass("hidden");
		if ($(window).width() < 768) {
			$(".toggle-menu").prepend($(".menu-list"));
		}
	});

	// set max height

	let setSize = (a) => {
		let el = $(String(a)).toArray();
		let maxHeight = 0;
		for (let i = 0; i < el.length; i++) {
			let elHeight = el[i].clientHeight;
			if (elHeight > maxHeight) {
				maxHeight = elHeight;
			}
			console.log(elHeight);
		}
		$(String(a)).height(maxHeight);
	};
	setSize(".product-wraper");
	setSize(".img-wraper");

	// slider

	let index = 1,
		x = 2,
		y = 2,
		slides = $(".slide").toArray();
	$(".slider-wraper").height($(".slide").height());
	let setIndex = (el) => {
		$(".slide").each((i, el) => {
			// let index = $(el).css("z-index");
			// console.log(index);
			$(el).css({ "z-index": Number(index++), left: (x += 5), top: (y += 5) });
		});
		index = 1;
		x = 0;
		y = 0;
	};
	setIndex($(".slide"));
	$("#next").click(function () {
		$(".slide").each((i, el) => {
			if ($(el).css("z-index") == slides.length) {
				$(el).addClass("next-slide");
				$(el).on("animationend", () => {
					$(el).removeClass("next-slide");
					$(el).css("z-index", "0");

					$(".slider-wraper").prepend($(el));
					setIndex($(".slide"));
				});
			}
		});
	});
	$("#prew").click(function () {
		$(".slide").each((i, el) => {
			if ($(el).css("z-index") == 1) {
				$(el).addClass("prew-slide");
				$(el).on("animationend", () => {
					$(el).removeClass("prew-slide");
					$(el).css("z-index", "5");
					$(".slider-wraper").append($(el));
					setIndex($(".slide"));
				});
			}
		});
	});
});
