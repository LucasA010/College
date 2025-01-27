const prompt = require("prompt-sync")({sigint:true});

console.log("Palyndrome check!");
str = prompt("Type a word: ");

if (str == str.toLowerCase().split('').reverse().join('')){
    console.log("It's a palyndrome!")
} else {
    console.log("It isn't a palyndrome!")
}