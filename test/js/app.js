let gyroscope = new Gyroscope({ frequency: 60 });
let data = document.querySelector("#data");
gyroscope.addEventListener("reading", (e) => {
	data.innerText = "Angular velocity along the X-axis " + gyroscope.x + "Angular velocity along the Y-axis " + gyroscope.y + "Angular velocity along the Z-axis " + gyroscope.z;
});
gyroscope.start();
