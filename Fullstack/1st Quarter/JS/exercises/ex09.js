const prompt = require("prompt-sync")({sigint:true});

str = prompt("Type a phrase: ");
strArr = str.split(' ');

biggestStr = '';
for (const words of strArr) {
    if (words.length > biggestStr.length) {
        biggestStr = words;
    }    
}
console.log('Your biggest word is ' + biggestStr);