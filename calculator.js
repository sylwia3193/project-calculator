
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Error: Division by zero';
    }
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let shouldResetDisplay = false;

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.getAttribute('data-action');
        const value = button.textContent;

        if (action === 'digit') {
            if (display.textContent === '0' || shouldResetDisplay) {
                display.textContent = value;
                shouldResetDisplay = false;
            } else {
                display.textContent += value;
            }
        } else if (action === 'operator') {
            if (currentOperator && !shouldResetDisplay) {
                secondNumber = display.textContent;
                let result = operate(currentOperator, firstNumber, secondNumber);
                if (typeof result === 'number' && !Number.isInteger(result)) {
                    result = Math.round(result * 1000) / 1000;
                }
                display.textContent = result;
                firstNumber = result;
            } else {
                firstNumber = display.textContent;
            }
            currentOperator = value;
            shouldResetDisplay = true;
        } else if (action === 'equals') {
            if (!currentOperator || shouldResetDisplay) return;
            secondNumber = display.textContent;
            let result = operate(currentOperator, firstNumber, secondNumber);
            if (result === 'Error: Division by zero') {
                display.textContent = "Nice try!";
            } else {
                if (typeof result === 'number' && !Number.isInteger(result)) {
                    result = Math.round(result * 1000) / 1000;
                }
                display.textContent = result;
            }
            firstNumber = '';
            secondNumber = '';
            currentOperator = '';
            shouldResetDisplay = true;
        } else if (action === 'clear') {
            display.textContent = '0';
            firstNumber = '';
            secondNumber = '';
            currentOperator = '';
            shouldResetDisplay = false;
        }
    });
});