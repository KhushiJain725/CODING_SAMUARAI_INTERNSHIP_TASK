// script.js
function clearDisplay() {
    document.getElementById('result').value = '';
}

function appendToDisplay(value) {
    document.getElementById('result').value += value;
}

function calculate() {
    const display = document.getElementById('result');
    console.log(eval(display.value)) /* eval function give the arithmatic operation of the given string */
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}
