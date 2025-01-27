const prompt = require("prompt-sync")({sigint:true});

str = prompt("Type a phrase: ");
strSplit = str.toLowerCase().split('');

var vowels = 0;
for (const letter of strSplit) {
    if (   letter == 'a' 
        || letter == 'e'
        || letter == 'i'
        || letter == 'o'
        || letter == 'u') {
            vowels++;

        }
 
}
console.log("There are "+vowels+" vowels!");