// geting proxy list from page
chrome.runtime.onMessage.addListener(function (responce, sender, sendResponce) {});
function randProxy(list) {
	let rnd = Math.floor(Math.random() * list.length);
}
function connectProxy(host, port, scheme, userName, pass) {
	var config = {
		mode: "fixed_servers",
		rules: {
			singleProxy: {
				scheme: scheme,
				host: host,
				port: parseInt(port),
			},
			bypassList: ["google.com"],
		},
	};
	failedLogins = 0;
	chrome.proxy.settings.set(
		{
			value: config,
			scope: "regular",
		},
		notifyProxy
	);
	function notifyProxy() {
		console.log("hee");
	}
}
