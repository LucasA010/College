const prompt = require("prompt-sync")({sigint: true});

var num = parseInt(prompt("Type a number: "));

if (num %2 == 0) {
    console.log("Your number is even!");
} else {
    console.log("Your number is odd! ");
}