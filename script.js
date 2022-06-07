function add(a,b) {
    return a + b;
}

function substract(a,b) {
    return a - b;
}

function multiply(a,b) {
    return a * b;
}

function divide(a,b) {
    return a / b;
}

function operate (a, operator, b) {
    if (operator === "+") {
        return add(a,b);
    } else if (operator === "-") {
        return substract(a,b);
    } else if (operator === "*") {
        return multiply(a,b);
    } else if (operator === "/") {
        return divide(a,b);
    }
}

let operation = [];
let number = [];
let result = null;

function storeNumber (newNumber) {
    number.push(newNumber);
    console.log(number);
}

function storeOperator (newOperator) {
    const operators = ["+", "-", "*", "/"]
    if (operation[-1] in operators === false && (number.length != 0 || operation.length != 0)) {
        operation.push(Number(number.join("")));
        operation.push(newOperator);
        number = [];
        console.log(operation);
    }
}

const displayText = document.querySelector("#displayText");

const one = document.querySelector("#one");
one.addEventListener('click', () => {
    storeNumber("1");
});

const two = document.querySelector("#two");
two.addEventListener('click', () => {
    storeNumber("2");
});

const three = document.querySelector("#three");
three.addEventListener('click', () => {
    storeNumber("3");
});

const four = document.querySelector("#four");
four.addEventListener('click', () => {
    storeNumber("4");
});

const five = document.querySelector("#five");
five.addEventListener('click', () => {
    storeNumber("5");
});

const six = document.querySelector("#six");
six.addEventListener('click', () => {
    storeNumber("6");
});

const seven = document.querySelector("#seven");
seven.addEventListener('click', () => {
    storeNumber("7");
});

const eight = document.querySelector("#eight");
eight.addEventListener('click', () => {
    storeNumber("8");
});

const nine = document.querySelector("#nine");
nine.addEventListener('click', () => {
    storeNumber("9");
});

const zero = document.querySelector("#zero");
zero.addEventListener('click', () => {
    storeNumber("0");
});

const sum = document.querySelector("#add");
sum.addEventListener('click', () => {
    storeOperator("+");
});

const substraction = document.querySelector("#substract");
substraction.addEventListener('click', () => {
    storeOperator("-");
});

const multiplication = document.querySelector("#multiply");
multiplication.addEventListener('click', () => {
    storeOperator("*");
});

const division = document.querySelector("#divide");
division.addEventListener('click', () => {
    storeOperator("/");
});

const equals = document.querySelector("#equals");
equals.addEventListener('click', () => {
    let a = null;
    let b = null;
    let operator = null;
    let subOperation = [];
    let subResult = null

    if (operation.length > 1 && number.length !== 0) {
        operation.push(Number(number.join("")));
        number = [];
        for (let i = 0; i <= operation.length; i += 3){
            subOperation = operation.slice(0, 2)
            a = subOperation[0];
            operator = subOperation[1];
            b = subOperation[2];
            subResult = operate(a, operator,b);
            operation.splice(0, 3);
            operation.unshift(subResult);
        }
        result = subResult;
        displayText.textContent = result;
    } else if (operation.length > 2) {
        for (let i = 0; i <= operation.length; i += 3){
            subOperation = operation.slice(0, 2)
            a = subOoperation[0];
            operator = subOperation[1];
            b = subOperation[2];
            subResult = operate(a, operator,b);
            operation.splice(0, 3);
            operation.unshift(subResult);
        }
        result = subResult;
        displayText.textContent = result;
    }

    console.log(a);
    console.log(b);
    console.log(operator);
    console.log(result);


});

const point = document.querySelector("#point");

const clear = document.querySelector("#clear");
clear.addEventListener('click', () => {
    operation = [];
    number = [];
    result = null;
});