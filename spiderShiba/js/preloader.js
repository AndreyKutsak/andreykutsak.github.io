window.addEventListener("load", function () {
	let content = document.querySelector("#preload");
	content.classList.add("hide-preload");
	content.addEventListener("transitionend", function () {
		content.remove();
	});
});
