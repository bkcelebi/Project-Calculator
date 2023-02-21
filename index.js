'use strict'

//creating a bunch of variables that will be used later on
let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;

//accessing the html elements and getting them ready to be manipulated
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.funcbtn');
const equalButton = document.querySelector('.buttonEqual');
const clearButton = document.querySelector('.ac');
const pointButton = document.querySelector('.point');
const lastOperationScreen = document.querySelector('.lastOperationScreen');
const currentOperationScreen = document.querySelector('.currentOperationScreen');

//adding eventlistener to the buttons
// window.addEventListener('keydown', handleKeyboardInput);
// equalButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
pointButton.addEventListener('click', appendPoint);

// gets the user input from each button click 
numbers.forEach(number => number.addEventListener('click', () => {
    // and passes them to the populateDisplay function 
    populateDisplay(number.textContent);
}));


function populateDisplay(number) {
    // resets the display if shouldResetScreen is true or
    // content of currentOperationScreen is equal to 0 
    // when the function is called
    if (currentOperationScreen.textContent === '0' || shouldResetScreen){
        resetScreen();
    }
    // populates the display based on clicks on number buttons
    currentOperationScreen.textContent += number;
    clearButton.textContent = 'C';
}

//resets the display and sets shouldResetScreen false
//for the second operand
function resetScreen(){
    currentOperationScreen = '';
    shouldResetScreen = false;
}

//reset the calculator
function clear(){
    currentOperationScreen.textContent = '0';
    lastOperationScreen.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
    clearButton.textContent = 'AC';
}

//adds .
function appendPoint(){
    //if shouldResetScreen variable is true when the function
    //is called then call resetScreen function
    if (shouldResetScreen) resetScreen();
    //if current screen is empty then it is assigned to 0
    if (currentOperationScreen.textContent === '') currentOperationScreen.textContent = '0';
    //it appends point right after the number
    if (currentOperationScreen.textContent.includes('.')) return 
    currentOperationScreen.textContent += '.';
}

// gets the user input for operators from each button click
operators.forEach(op => op.addEventListener('click', () => {
    // passes them to setOperation function
    setOperation(op.textContent);
}));

//gets the operator and sets the operation
function setOperation(operator){
    // at the first first call, currentOperation is null
    // evaluate function is called at the second call and forward
    if (currentOperation !== null) evaluate()
    //first number user put assigned
    firstOperand = currentOperationScreen.textContent;
    //first operator user put assigned
    currentOperation = operator;
    //the lastOperationScreen populated
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
    //sets shouldResetScreen true for the next operand
    shouldResetScreen = true;
}

function evaluate(){
    if (currentOperation === null || shouldResetScreen) return;
    if (currentOperation === '÷' && currentOperationScreen.textContent === '0'){
        alert("You can't divide by 0!");
        return;
    }
    secondOperand = currentOperationScreen.textContent;
    currentOperationScreen.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    );
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
    currentOperation = null;
}

function roundResult(number){
    return Math.round(number * 1000) / 100;
}

// add function
const add = (val1, val2) => {
    return val1 + val2;
};

// subtract function
const subtract = (val1, val2) => {
    return val1 - val2;
};

// multiply function
const multiply = (val1, val2) => {
    return val1 * val2;
};

// divide function
const divide = (val1, val2) => {
    return val1 / val2;
};

// operate function to accept 
//type of operator and 2 values
//and call the appropriate function
//to calculate the result
// const operate = (operator, val1, val2) => {
//     return operator(val1, val2);
// };

















