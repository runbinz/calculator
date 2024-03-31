document.addEventListener("DOMContentLoaded", function() {
    const screenPrevious = document.querySelector(".previous");
    const screenCurrent = document.querySelector(".current");
    const clearButton = document.getElementById("clear-btn");
    const numberButtons = document.querySelectorAll(".number");
    const operatorButtons = document.querySelectorAll(".operator");
    const decimalButton = document.querySelector(".decimal");
    const equalButton = document.querySelector(".equal");

    let currentOperand = '';
    let previousOperand = '';
    let currentOperator = null;
    let shouldResetScreen = false;

    function updateScreen() {
        screenCurrent.innerText = currentOperand;
        screenPrevious.innerText = previousOperand;
    }

    function appendNumber(number) {
        if (number === '.' && currentOperand.includes('.')) return;
        currentOperand = currentOperand.toString() + number.toString();
    }

    function chooseOperator(operator) {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            compute();
        }
        currentOperator = operator;
        previousOperand = currentOperand;
        currentOperand = '';
    }

    function compute() {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (currentOperator) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case 'x':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        currentOperand = computation;
        currentOperator = null;
        previousOperand = '';
    }

    function clear() {
        currentOperand = '';
        previousOperand = '';
        currentOperator = null;
        updateScreen();
    }

    function appendNumber(number) {
        if (number === '.' && currentOperand.includes('.')) return;
        if (currentOperand.length < 18) { // Adjust the limit as needed
            currentOperand = currentOperand.toString() + number.toString();
        }
    }
    

    function handleButtonClick() {
        if (shouldResetScreen) {
            clear();
            shouldResetScreen = false;
        }
        const buttonValue = this.innerText;
        switch (buttonValue) {
            case '+':
            case '-':
            case 'x':
            case '/':
                chooseOperator(buttonValue);
                break;
            case '.':
                appendNumber(buttonValue);
                break;
            case '=':
                compute();
                shouldResetScreen = true;
                break;
            case 'C':
                clear();
                break;
            default:
                appendNumber(buttonValue);
                break;
        }
        updateScreen();
    }

    clearButton.addEventListener('click', clear);
    numberButtons.forEach(button => button.addEventListener('click', handleButtonClick));
    operatorButtons.forEach(button => button.addEventListener('click', handleButtonClick));
    decimalButton.addEventListener('click', handleButtonClick);
    equalButton.addEventListener('click', handleButtonClick);
});
