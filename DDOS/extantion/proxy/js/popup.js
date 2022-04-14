chrome.runtime.onMessage.addListener(function (responce, sender, sendResponce) {
	drawList(responce.link, responce.type);
	console.log(responce);
});
function drawList(list, type) {
	if (type == "vpn") {
	} else if (type == "proxy") {
		let title = document.getElementById("extTitle");
		title.innerText = "Список проксі серверів";
		let extList = document.getElementById("extList");
		let i = 1;
		for (const key in list) {
			let item = document.createElement("li");
			item.className = "active";
			let count = document.createElement("div");
			count.className = "count-wraper";
			count.textContent = i++;
			let host = document.createElement("div");
			host.className = "adress-wraper";
			host.textContent = list[key]["host"];
			let scheme = document.createElement("div");
			scheme.className = "scheme-wraper";
			scheme.textContent = list[key]["scheme"];
			item.appendChild(count);
			item.appendChild(host);
			item.appendChild(scheme);
			extList.appendChild(item);
		}
	}
}
