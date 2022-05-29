$(document).ready(function () {
	$(".msg-container").removeClass("hide");
	$("#closeBtn").click((e) => {
		$(".msg-container").addClass("hide");
	});
	// responsive menu
	$("#tglBtn").click(() => {
		$("#menu").toggleClass("hide-menu");
	});
});
