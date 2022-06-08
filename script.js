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

function operate(a, operator, b) {
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
const operatorList = ["+", "-", "*", "/"]

function storeNumber(newNumber) {
    if (result !== null) {
        operation = [];
        result = null;
    }
    number.push(newNumber);
    console.log(number);
}

function storeOperator(newOperator) {
    if (result !== null) {
        operation.push(newOperator);
        result = null;
    }
    if (number.length !== 0 || operation.length !== 0 && operatorList.indexOf(operation[operation.length - 1]) === -1) {
        operation.push(Number(number.join("")));
        operation.push(newOperator);
        number = [];
        console.log(operation);
    } else if (operatorList.indexOf(operation[operation.length - 1]) !== -1) {
        operation.pop();
        operation.push(newOperator);
    }
}

function checkForMultDiv(operator) {
    if (operator === "*" || operator === "/") {
        return true;
    } else {
        return false;
    }
}

function resolveOperation(operation) {
    let a = null;
    let b = null;
    let operator = null;
    let subResult = null;

    const amountOfMultDiv = operation.filter(checkForMultDiv);
    let n = 0
    while (n < amountOfMultDiv.length) {
        n++;
        const operatorIndex = operation.findIndex(checkForMultDiv);
        operator = operation[operatorIndex];
        a = operation[operatorIndex - 1];
        b = operation[operatorIndex + 1];
        if (operator === "/" && b === 0) {
            return "ERROR";
        } else {
        subResult = operate(a, operator, b);
        operation.splice(operatorIndex - 1, 3, subResult);
        }
    }

    if (operation.length > 1) {
        for (let i = 0; i < operation.length; i++){
            a = operation[0];
            operator = operation[1];
            b = operation[2];
            subResult = operate(a, operator, b);
            operation.splice(0, 3, subResult);
        }
    }
    return Math.round(subResult * 100) / 100;
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
    if (operation.length > 1 && number.length !== 0) {
        operation.push(Number(number.join("")));
        number = [];
        console.log(operation);
        result = resolveOperation(operation);     
    } else if (operation[operation.length - 1] ===  "+" || operation[operation.length - 1] ===  "-" || operation[operation.length - 1] ===  "*" || operation[operation.length - 1] ===  "/" ) {
        operation.pop();
        console.log(operation);
        if (operation.length > 1) {
        result = resolveOperation(operation);
        } else {
            result = operation;
        }
    } else {
        result = Number(number.join(""));
    }
    
    displayText.textContent = result;
    operation = [result];
    console.log(result);
});

const point = document.querySelector("#point");
point.addEventListener('click', () => {
    if (number.indexOf('.') === -1) {
        number.push(".");
    }
    console.log(number);
})

const clear = document.querySelector("#clear");
clear.addEventListener('click', () => {
    operation = [];
    number = [];
    result = null;
});