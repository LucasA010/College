const prompt = require("prompt-sync")({sigint:true});

num = parseInt(prompt("How many numbers of fibonacci you want to see: "));

function fib(n) {
    if (n <=1) {
        return n
    }
    return fib(n-1) + fib(n-2);
}

for (let i=0; i<=num; i++) {
    console.log(fib(i));
}
