// init Extantion for web site scripts
document.body.dataset.extantion = "true";
let btns = document.querySelectorAll(".btn-connect");

btns.forEach(function (el) {
	el.addEventListener("click", function () {
		let type = this.dataset.conectionType;
		let list = this.dataset.conectionList;
		if (type == "undefined") {
			alert("Невдалося встановити тип зєднання використовуйте свій ВПН");
		} else if (list == "undefined") {
			alert("Невдалося завантажити список з данними");
		} else {
			getList(list, type);
		}
	});
});
function getList(list, type) {
	fetch(list, {
		method: "GET",
		mode: "cors",
		headers: { Accept: "application/json" },
	})
		.then(function (responce) {
			return responce.json();
		})
		.then(function (data) {
			if (type === "vpn") {
			} else if (type === "proxy") {
				chrome.runtime.sendMessage({ link: data, type: type }, function (response) {
					console.log(response);
				});
			}
		});
}
function checkProxyList(list) {}
