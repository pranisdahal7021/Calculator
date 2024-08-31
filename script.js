const calculatorScreen = document.getElementById('calculator-screen');
let currentInput = '';
let expression = '';

const updateScreen = (value) => {
    calculatorScreen.value = value;
};

const clearScreen = () => {
    currentInput = '';
    expression = '';
    updateScreen('0');
};

const handleNumber = (number) => {
    currentInput += number;
    expression += number;
    updateScreen(expression);
};

const handleOperator = (op) => {
    if (currentInput === '' && expression === '') return; // Prevent starting with an operator
    if (currentInput === '' && expression !== '') { // Replace the last operator if the user presses a new one without entering a number
        expression = expression.slice(0, -1);
    }
    expression += op;
    currentInput = ''; // Reset current input for the next number
    updateScreen(expression);
};

const calculate = () => {
    try {
        const result = eval(expression); // Calculate the result using JavaScript's eval function
        expression = result.toString();
        currentInput = expression;
        updateScreen(expression);
    } catch (error) {
        updateScreen('Error');
    }
};

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('operator')) {
            handleOperator(button.value);
        } else if (button.classList.contains('equal-sign')) {
            calculate();
        } else if (button.id === 'clear') {
            clearScreen();
        } else {
            handleNumber(button.value);
        }
    });
});

clearScreen();
