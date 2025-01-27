const prompt = require("prompt-sync")({sigint:true});

num = parseInt(prompt("Type a number to get its factorial: "));
fact = 1;

for (i=1; i<=num; i++) {
    fact *= i;
}
console.log(fact);