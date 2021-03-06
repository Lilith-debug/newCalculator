//Functions
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

function isMultDivPer(thisOperator) {
    return thisOperator === "*" || thisOperator === "/" || thisOperator === "%"
}

function isPercentageAlone(thisOperator) {
    return thisOperator === "%" && operatorList.indexOf(operation[(operation.indexOf(thisOperator) + 1)]) !== -1
}

function resolveOperation(operation) {
    let a = null;
    let b = null;
    let operator = null;
    let subResult = null;

    if (operation.indexOf["%"] !== -1) {
        //Resolve percentages followed by another operator first
        const amountOfPerAlone = operation.filter(isPercentageAlone);
        console.log(amountOfPerAlone);
        let n = 0;
        while (n < amountOfPerAlone.length) {
            n++;
            console.log("ok");
            const percentageIndex = operation.findIndex(isPercentageAlone);
            subResult = operation[percentageIndex - 1] / 100;
            operation.splice(percentageIndex - 1, 2, subResult);
            console.log(subResult);
        }
    }

    const amountOfMultDivPer = operation.filter(isMultDivPer);

    let n = 0;
    while (n < amountOfMultDivPer.length) {
        //Then resolve multiplications, divisions and other percentages from left to right
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
        //Resolve sums and substractions at last from left to right
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

function storeNumber(newNumber) {
    if (result !== null || result === "ERROR") {
        operation = [];
        result = null;
        displayContent = [];
    }

    number.push(newNumber);
    refreshDisplay();
}

function storePoint() {
    if (number.indexOf('.') === -1) {
        number.push(".");
        refreshDisplay();
    }
}

function storeOperator(newOperator) {
    if (result !== null) {
        if (result !== "ERROR") {
            result = null;
            operation.push(newOperator);
            refreshDisplay();
        }
    } else if (number.length !== 0 || operation.length !== 0 && operatorList.indexOf(operation[operation.length - 1]) === -1) {
        //Add new operator to operation after a number
        operation.push(Number(number.join("")));
        operation.push(newOperator);
        number = [];
        refreshDisplay();
    } else if (operatorList.indexOf(operation[operation.length - 1]) !== -1 && operation[operation.length - 1] === "%") {
        //Add new operator to operation after percentage
        operation.push(newOperator);
        refreshDisplay();
    } else if (operatorList.indexOf(operation[operation.length - 1]) !== -1) {
        //Replace current operator in operation with new operator
        if (newOperator !== "%" || operation[operation.length - 1] !== "%") {
        operation.pop();
        operation.push(newOperator);
        refreshDisplay();
        }
    }
}

function equalsTo() {
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

    number = [];
    displayContent = [result];
    displayText.textContent = result;
    operation = [result];
    console.log(result);
}

function erase() {
    number.length > 0 ? number.pop() : operation.pop();
    displayContent.pop();
    refreshDisplay();
}

function clearAll() {
    operation = [];
    number = [];
    result = null;
    displayContent = [];
    refreshDisplay();
}

function pressKey(e) {
    const key = e.key;
    console.log(typeof(key));
    if (!isNaN(key)) {
        storeNumber(key);
    } else if (key === ".") {
        storePoint();
    } else if (operatorList.indexOf(key) !== -1) {
        storeOperator(key);
    } else if (key === "Enter") {
        equalsTo();
    } else if (key === "Backspace") {
        erase();
    }
}

function refreshDisplay() {
    console.log("number:" + number);
    console.log("operation:" + operation);

    if (number.length !== 0) {
        //Add new number or floating point to display
        displayContent.push(number[number.length - 1]);
        if (operatorList.indexOf(displayContent[displayContent.length - 2]) === -1 && displayContent.length > 1) {
            const lastNumber = displayContent[displayContent.length - 2] + displayContent[displayContent.length - 1];
            displayContent.splice(displayContent.length - 2, 2, lastNumber);
        }
    } else if (number.length === 0 && operatorList.indexOf(displayContent[displayContent.length - 1]) !== -1){
        //Replace current operator with new operator in display
        displayContent.pop();
        displayContent.push(operation[operation.length - 1]);
        if (operation[operation.length - 1] === "%") {
            const numberPercent = displayContent[displayContent.length - 2] + displayContent[displayContent.length - 1];
            displayContent.splice(displayContent.length - 2, 2, numberPercent);
        }
    } else if (number.length === 0 && operation.length !== 0) {
        //Add new operator to display
        displayContent.push(operation[operation.length - 1]);
        if (operation[operation.length - 1] === "%") {
            const numberPercent = displayContent[displayContent.length - 2] + displayContent[displayContent.length - 1];
            displayContent.splice(displayContent.length - 2, 2, numberPercent);
        }
    }  

    console.log(displayContent);
    console.log(result);
    displayText.textContent = displayContent.join(" ");
}

//Global variables
let operation = [];
let number = [];
let result = null;
let displayContent = [];
const operatorList = ["+", "-", "*", "/", "%"]

//Display, buttons and keys
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
    storePoint();
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
    equalsTo();
});

const backspace = document.querySelector("#backspace");
backspace.addEventListener("click", () => {
    erase();
});

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    clearAll();
});

window.addEventListener("keydown", pressKey);


