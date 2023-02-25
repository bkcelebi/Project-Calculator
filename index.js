'use strict'

//creating a bunch of variables that will be used later on
let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;
let operandSign = null;

//accessing the html elements and getting them ready to be manipulated
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.funcbtn');
const equalButton = document.querySelector('.buttonEqual');
const clearButton = document.querySelector('.ac');
const pointButton = document.querySelector('.point');
const lastOperationScreen = document.querySelector('.lastOperationScreen');
const currentOperationScreen = document.querySelector('.currentOperationScreen');
const negative = document.querySelector('.negative');
const percentage = document.querySelector('.percentage');

//adding eventlistener to the buttons
window.addEventListener('keydown', handleKeyboardInput);
equalButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
pointButton.addEventListener('click', appendPoint);
negative.addEventListener('click', sign);
percentage.addEventListener('click', perc);

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
    // manipulating the content of clear button
    clearButton.textContent = 'C';

}

//either turns the value into negative or positive
function sign(){
    //if the currentOperationScreen is 0 then it does NOT change the
    //the sign of the value on the screen
    if (operandSign === null && currentOperationScreen.textContent !== '0') {
        currentOperationScreen.textContent = '-' + currentOperationScreen.textContent;
        operandSign = 'negative';
    //next time when the button is click it removes the - symbol
    //and sets the operandSign variable to null
    }else if(operandSign === 'negative') {
        currentOperationScreen.textContent = currentOperationScreen.textContent.slice(1);
        operandSign = null;
    };
}

//it divides the current value by 100 if the 
//current value is not 0
function perc(){
    if(currentOperationScreen.textContent !== '0'){
        currentOperationScreen.textContent = currentOperationScreen.textContent / 100;
    }else{
        currentOperationScreen.textContent === '0';
    }
}

//resets the display and sets shouldResetScreen false
//for the second operand
function resetScreen(){
    currentOperationScreen.textContent = '';
    shouldResetScreen = false;
    operandSign = null;
}

//reset the calculator
function clear(){
    currentOperationScreen.textContent = '0';
    lastOperationScreen.textContent = '';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
    operandSign = null;
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
    if (currentOperation !== null) {
        //if the second operand is negative, sets the value
        //of the operandSign to negative
        if (currentOperationScreen.textContent < 0) operandSign = 'negative';
        else operandSign = null;
        evaluate();
    }
    //if the value is already negative then it 
    if (currentOperationScreen.textContent < 0) operandSign = 'negative';
    //first number user put assigned
    firstOperand = currentOperationScreen.textContent;
    //first operator user put assigned
    currentOperation = operator;
    //the lastOperationScreen populated
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
    //sets shouldResetScreen true for the next operand
    shouldResetScreen = true;
}

//this function helps to get the secondOperand's value
//and populate the currentOperationScreen
//based on the result of roundResult
function evaluate(){
    //a second checkpoint to escape from the function
    if (currentOperation === null || shouldResetScreen) return;
    //a basic math logic applied as 0 cant be divided by 0
    if (currentOperation === '÷' && currentOperationScreen.textContent === '0'){
        alert("You can't divide by 0!");
        return;
    }
    //getting the secondOperand value from  
    //the content of the currentOperationScreen
    secondOperand = currentOperationScreen.textContent;
    //roundResult function by passing it
    //currentOperation, firstOperand and secondOperand parameters
    currentOperationScreen.textContent = roundResult(
        operate(currentOperation, firstOperand, secondOperand)
    );
    //populating the lastOperationScreen based on
    //First operand, current operations and second operand
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
    //getting the currentOperation variable ready
    //for the next operation
    currentOperation = null;
}

//getting the value of the operation rounded
function roundResult(number){
    return Math.round(number * 1000) / 1000;
}

//this function handles keyboard input
function handleKeyboardInput(e){
    if(e.key >= 0 && e.key <=9) populateDisplay(e.key);
    if(e.key === '.') appendPoint();
    if(e.key === '=' || e.key === 'Enter') evaluate();
    if(e.key === 'Escape') clear();
    if(e.key === '+' || e.key === '/' || e.key === '*' || e.key === '-') setOperation(convertOperator(e.key));
}

//this function converts keyboard operators
//into the default variables
function convertOperator(keyboardOperator){
    if (keyboardOperator === '/') return '÷';
    if (keyboardOperator === '*') return 'x';
    if (keyboardOperator === '-') return '-';
    if (keyboardOperator === '+') return '+';
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
// type of operator and 2 values
// and call the appropriate function
// to calculate the result
function operate(operator, val1, val2){
    val1 = Number(val1);
    val2 = Number(val2);
    switch (operator){
        case '+':
            return add(val1, val2);
        case '-':
            return subtract(val1, val2);
        case 'x':
            return multiply(val1, val2);
        case '÷':
            if (val2 === 0) return null;
            else return divide(val1, val2);
        default:
            return null;
    };
}

















