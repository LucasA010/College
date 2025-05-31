const checkPassword = document.getElementById("passwordCheck");
const password = document.getElementById("password");
const subButton = document.getElementById("submit");
const form = document.getElementById("form");

subButton.addEventListener("mouseover", () => {
    if (checkPassword != password) {
        let warnMsg = document.createElement("p");
        warnMsg.innerText = "Passwords don't match"
        form.appendChild(warnMsg);
    }
})