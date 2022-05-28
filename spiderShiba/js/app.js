window.addEventListener("load", function () {
	let adres = document.querySelectorAll(".adress-copied");
	for (let i = 0; i < adres.length; i++) {
		adres[i].addEventListener("click", function (e) {
			let data = this.textContent;
			let adresMsg = this.parentElement.querySelector(".copiedMsg");
			navigator.clipboard.writeText(data);
			adresMsg.classList.remove("hideMsg");
			setTimeout(() => {
				adresMsg.classList.add("hideMsg");
			}, 1500);
		});
	}

	// running text
	let num = 200;
	for (let i = 0; i < num; i++) {
		runningText();
	}
	function runningText() {
		let marq = document.querySelector("#marq");
		let text = document.createElement("p");
		text.className = "marq-text";
		text.innerText = "WARNING: this is not a meme coin";
		marq.appendChild(text);
	}
	// toggle menu
	let btn = document.querySelector("#toggleMenu");
	let menuWrap = document.querySelector("#menuWraper");
	btn.addEventListener("click", function (e) {
		this.classList.toggle("clicked");
		menuWrap.classList.toggle("active");
	});

	// draw diagram
	let cir = document.querySelectorAll(".cir"),
		radius = null,
		circulance = null,
		percent = 0;
	let w = cir[0].parentElement.clientWidth;
	cir[0].parentElement.style.height = w + "px";
	for (let i = 0; i < cir.length; i++) {
		let text = document.createElement("text");

		cir[i].setAttribute("r", "45%");
		if (radius === null || circulance === null) {
			radius = cir[i].getBoundingClientRect().height / 2;
			circulance = 2 * Math.PI * radius;
		}
		let fillColor = cir[i].dataset.fill,
			strokeDash = cir[i].dataset.percent;
		cir[i].style.stroke = fillColor;
		cir[i].style.strokeDasharray = (strokeDash * circulance) / 100 + ` ${circulance - (strokeDash * circulance) / 100}`;
		cir[i].style.strokeDashoffset = "-" + (percent * circulance) / 100;
		text.innerText = strokeDash + "%";
		cir[i].appendChild(text);
		percent += Number(strokeDash);
	}
	// acardion
	let item = document.querySelectorAll(".quest-item");
	for (let i = 0; i < item.length; i++) {
		item[i].addEventListener("click", function () {
			for (let a = 0; a < item.length; a++) {
				item[a].classList.remove("active");
			}
			this.classList.toggle("active");
		});
	}
});
