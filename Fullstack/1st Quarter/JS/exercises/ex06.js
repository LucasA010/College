const prompt = require("prompt-sync")({sigint:true});
str = prompt("Type something: ");

strReversed = str.split('').reverse().join('');
console.log(strReversed);
console.log("Here it is reversed!");