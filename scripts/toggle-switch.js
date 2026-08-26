const body = document.querySelector("body");
const modeSwitch = document.querySelector(".toggle-switch");
const modeText = document.querySelector(".mode-text");

modeSwitch.addEventListener("click", () => {

    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        modeText.textContent = "Dark Mode";
    } else {
        modeText.textContent = "Light Mode";
    }

});