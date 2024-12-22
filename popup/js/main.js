document.getElementById("pop-up").addEventListener("click", () => {
	const container = document.getElementById("container");

	if (container.classList.contains("hidden")){
		container.classList.remove("hidden");
		container.classList.add("visible");
	}
})

document.getElementById("close").addEventListener("click", () => {
	const container = document.getElementById("container");
	container.classList.remove("visible");
	container.classList.add("hidden");
})