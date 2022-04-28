let arr = [1, 2, 3, 4];
let a = 0;
arr.forEach(function (k) {
	test(k);
});
async function test(b) {
	await setInterval(function () {
		return true;
	}, 2000);
	await console.log(b);
	await b;
}
