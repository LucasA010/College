const prompt = require("prompt-sync") ({sigint: true});

let n1 = parseInt(prompt("Please input the first number: "));
let n2 = parseInt(prompt("Please input the second number: "));


console.log("Addition is "+ (n1 + n2));
console.log("Subtraction is "+ (n1 - n2));
console.log("Multiplication is "+ (n1 * n2));
if (n1 == 0 || n2 == 0)
    console.log("Cant divide by 0")
else 
    console.log("Division is "+ (n1 / n2));