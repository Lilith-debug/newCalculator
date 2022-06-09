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

function percent(a,b) {
    return (a / 100) * b
}

function operate(a, operator, b) {
    switch(operator) {
        case "+":
            return add(a,b);
        case "-":
            return substract(a,b);
        case "*":
            return multiply(a,b);
        case "/":
            return divide(a,b);
        case "%":
            return percent(a,b);
    }
}

function refreshDisplay() {
    console.log("number:" + number);
    console.log("operation:" + operation);
    if (number.length !== 0) {
        displayContent.push(number[number.length - 1]);
        if (operatorList.indexOf(displayContent[displayContent.length - 2]) === -1 && displayContent.length > 1) {
            const lastNumber = displayContent[displayContent.length - 2] + displayContent[displayContent.length - 1];
            displayContent.splice(displayContent.length - 2, 2, lastNumber);
        }
    } else if (number.length === 0 && operatorList.indexOf(displayContent[displayContent.length - 1]) !== -1){
        displayContent.pop();
        displayContent.push(operation[operation.length - 1]);
    } else if (number.length === 0 && operation[operation.length - 1] === "%") {
        displayContent.push(operation[operation.length - 1]);
        const numberPercent = displayContent[displayContent.length - 2] + displayContent[displayContent.length - 1];
        displayContent.splice(displayContent.length - 2, 2, numberPercent);
    }  else {
        displayContent.push(operation[operation.length - 1]);
    }

    console.log(displayContent);
    displayText.textContent = displayContent.join(" ");
}

function storeNumber(newNumber) {
    if (result !== null) {
        operation = [];
        result = null;
    }

    number.push(newNumber);
    refreshDisplay();
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
    } else if (operatorList.indexOf(operation[operation.length - 1]) !== -1) {
        if (newOperator !== "%") {
            operation.pop();
        }
        
        operation.push(newOperator);
    }

    refreshDisplay();
}

function isMultDivPer(thisOperator) {
    if (thisOperator === "*" || thisOperator === "/" || thisOperator === "%") {
        return true;
    } else {
        return false;
    }
}

function isPercentageAlone(thisOperator) {
    return thisOperator === "%" && operatorList.indexOf(operation[thisOperator + 1]) !== -1
}
function resolveOperation(operation) {
    let a = null;
    let b = null;
    let operator = null;
    let subResult = null;

    if (operation.indexOf["%"] !== -1) {
        const amountOfPerAlone = operation.filter(isPercentageAlone);
        let n = 0;
        while (n < amountOfPerAlone.length) {
            n++;
            console.log("ok");
            const percentageIndex = operation.findIndex(isPercentageAlone);
            subResult = operation[percentageIndex - 1] / 100;
            operation.splice(operatorIndex - 1, 2, subResult);
            console.log(subResult);
        }
    }

    const amountOfMultDivPer = operation.filter(isMultDivPer);

    let n = 0;
    while (n < amountOfMultDivPer.length) {
        n++;
        const operatorIndex = operation.findIndex(isMultDivPer);
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

let operation = [];
let number = [];
let result = null;
let displayContent = [];
const operatorList = ["+", "-", "*", "/", "%"]

const displayText = document.querySelector("#displayText");

const one = document.querySelector("#one");
one.addEventListener("click", () => {
    storeNumber("1");
});

const two = document.querySelector("#two");
two.addEventListener("click", () => {
    storeNumber("2");
});

const three = document.querySelector("#three");
three.addEventListener("click", () => {
    storeNumber("3");
});

const four = document.querySelector("#four");
four.addEventListener("click", () => {
    storeNumber("4");
});

const five = document.querySelector("#five");
five.addEventListener("click", () => {
    storeNumber("5");
});

const six = document.querySelector("#six");
six.addEventListener("click", () => {
    storeNumber("6");
});

const seven = document.querySelector("#seven");
seven.addEventListener("click", () => {
    storeNumber("7");
});

const eight = document.querySelector("#eight");
eight.addEventListener("click", () => {
    storeNumber("8");
});

const nine = document.querySelector("#nine");
nine.addEventListener("click", () => {
    storeNumber("9");
});

const zero = document.querySelector("#zero");
zero.addEventListener("click", () => {
    storeNumber("0");
});

const point = document.querySelector("#point");
point.addEventListener("click", () => {
    if (number.indexOf('.') === -1) {
        number.push(".");
        refreshDisplay();
    }
});

const sum = document.querySelector("#add");
sum.addEventListener("click", () => {
    storeOperator("+");
});

const substraction = document.querySelector("#substract");
substraction.addEventListener("click", () => {
    storeOperator("-");
});

const multiplication = document.querySelector("#multiply");
multiplication.addEventListener("click", () => {
    storeOperator("*");
});

const division = document.querySelector("#divide");
division.addEventListener("click", () => {
    storeOperator("/");
});

const percentage = document.querySelector("#percentage");
percentage.addEventListener("click", () => {
    storeOperator("%");
});

const equals = document.querySelector("#equals");
equals.addEventListener("click", () => {
    if (operation.length > 1 && number.length !== 0) {
        operation.push(Number(number.join("")));
        number = [];
        console.log(operation);
        result = resolveOperation(operation);     
    } else if (operation.length > 2 && operatorList.indexOf(operation[operation.length - 1]) !== -1) {
        operation.pop();
        console.log(operation);
        result = resolveOperation(operation);
    } else if (operation.length === 2) {
        operation[operation.length - 1] === "%" ? result = operation[0] / 100 : result = operation[0];
    } else {
        result = Number(number.join(""));
    }

    displayContent = result;
    displayText.textContent = result;
    operation = [result];
    console.log(result);
});

const backspace = document.querySelector("#backspace");
backspace.addEventListener("click", () => {
    number.length > 0 ? number.pop() : operation.pop();
    displayContent.pop();
    refreshDisplay();
});

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    operation = [];
    number = [];
    result = null;
    displayContent = [];
    refreshDisplay();
});

