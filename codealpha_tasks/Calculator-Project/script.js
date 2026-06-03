// Global State Variables
let currentOperand = '0';
let previousOperand = '';
let operation = null;

// DOM Elements
const currentDisplay = document.getElementById('current-operand');
const previousDisplay = document.getElementById('previous-operand');

// Appends a number or decimal point to the active screen
function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return; // Prevent double decimals
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number.toString();
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}

// Sets the mathematical operation
function chooseOperator(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

// Evaluates the math statement
function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero!");
                clearScreen();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }

    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

// Clears everything (AC functionality)
function clearScreen() {
    currentOperand = '0';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

// Deletes the last digit (DEL functionality)
function deleteNumber() {
    if (currentOperand === '0') return;
    if (currentOperand.length === 1) {
        currentOperand = '0';
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}

// Keeps UI text up-to-date with backend values
function updateDisplay() {
    currentDisplay.innerText = currentOperand;
    if (operation != null) {
        // Formats the symbol visually for display purposes
        let visualOp = operation;
        if (operation === '*') visualOp = '×';
        if (operation === '/') visualOp = '÷';
        previousDisplay.innerText = `${previousOperand} ${visualOp}`;
    } else {
        previousDisplay.innerText = '';
    }
}

// BONUS: Full Keyboard Support Event Listener
window.addEventListener('keydown', e => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        appendNumber(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        chooseOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault(); // Prevents standard page scoping behavior on form elements
        compute();
    } else if (e.key === 'Backspace') {
        deleteNumber();
    } else if (e.key === 'Escape') {
        clearScreen();
    }
});