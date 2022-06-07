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
    if (operation !== null) {
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
//equals.addEventListener('click', () => {
//    if (a !== null & operator !== null & b !== null) {
//        result = operate(a, operator, b);
//        displayText.textContent = result;
//    }
//});

const point = document.querySelector("#point");

const clear = document.querySelector("#clear");
clear.addEventListener('click', () => {
    operation = [];
    number = [];
    result = null;
});