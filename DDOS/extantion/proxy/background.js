chrome.windows.onCreated.addListener(function () {
	var config = {
		mode: "fixed_servers",
		rules: {
			proxyForHttp: {
				scheme: "http",
				host: "41.60.25.154",
				port: 8080,
			},
			bypassList: ["foobar.com"],
		},
	};
	chrome.proxy.settings.set({ value: config, scope: "regular" }, function () {});
});
