let inputElement = document.querySelector('.input');
let inputText = document.querySelector('.input__text');

console.log(inputElement);
console.log(inputText);
inputText.onclick = function() {inputElement.focus()};
