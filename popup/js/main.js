function container_toggle() {
	const container = document.getElementById("container");

	if (container.classList.contains("hidden")){
		container.classList.remove("hidden");
		container.classList.add("visible");
	}
	else {
		container.classList.remove("visible");
		container.classList.add("hidden");
	}
}

const form = document.getElementById('form-container');
const inputs = form.querySelectorAll('input, textarea');

form.addEventListener('submit', () => {
    let isValid = true;

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            isValid = false;
        }
    });

    if (isValid) {
        container_toggle();
    }
});

document.getElementById("pop-up").addEventListener("click", container_toggle);
document.getElementById("close").addEventListener("click", container_toggle);