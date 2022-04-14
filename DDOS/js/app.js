function drawConectionInfo() {
	let conectionMsg = document.querySelector("#DataContainer");
	fetch(ipApi)
		.then(function (responce) {
			return responce.json();
		})
		.then(function (data) {
			let innerData = `<p class="ip data-text">ваш IP ${data.query}</p>
            <p class="contry data-text">ваша країна ${data.country}</p>
            <p class="city data-text">Ваше місто ${data.regionName}</p>
            <p class="provider data-text">Ваш провайдер ${data.as}</p>`;
			conectionMsg.innerHTML = innerData;
		});
	checkBrowser();
}
drawConectionInfo();
function checkBrowser() {
	var browserName = (function (agent) {
		switch (true) {
			case agent.indexOf("edge") > -1:
				return "MS Edge";
			case agent.indexOf("edg/") > -1:
				return "Edge ( chromium based)";
			case agent.indexOf("opr") > -1 && !!window.opr:
				return "Opera";
			case agent.indexOf("chrome") > -1 && !!window.chrome:
				return "Chrome";
			case agent.indexOf("trident") > -1:
				return "MS IE";
			case agent.indexOf("firefox") > -1:
				return "Mozilla Firefox";
			case agent.indexOf("safari") > -1:
				return "Safari";
			default:
				return "other";
		}
	})(window.navigator.userAgent.toLowerCase());
	if (browserName !== "Chrome") {
		container.classList.add("err main-desc");
		container.parentNode.classList.remove("hide");
		container.innerText = "покищо наш сайт коректно працює лише з браузером Google Chrome. Будь ласка встановіть браузер Google Chrome, також будьте уважні і скачуйте з офіційного сайту Google";
	} else {
		checkExtantion();
	}
}
function checkExtantion() {
	console.log(document.body.dataset.extantion);
	let isInstaledExtantion = document.body.dataset.extantion === "true";
	if (isInstaledExtantion) {
	} else {
		container.classList.add("err");
		container.parentNode.classList.remove("hide");
		container.innerText =
			"Для коректної роботи сайту необхідно встановити розширення для вашого браузеру, яке буде самостійно підключати вас до проксі або впн і буде автоматично вас перепідключати через певні проміжки часу";
		let link = document.createElement("a");
		link.className = "download-lnk";
		link.setAttribute(`href="${extantionLink}"`);
		link.textContent = "Завантажити розширення до браузера";
		container.appendChild(link);
	}
}
let;
