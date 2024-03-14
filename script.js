var firstNum = null;
var lastNum = null;
var operator = null;
var initialized = false;
var inputString = "0";
var totalSum = 0;
var screenEl = document.querySelector(".screen");
var buttons = document.querySelectorAll("button");
var add = function (num1, num2) {
    return num1 + num2;
};
var subtract = function (num1, num2) {
    return num1 - num2;
};
var divide = function (num1, num2) {
    return num1 / num2;
};
var multiply = function (num1, num2) {
    return num1 * num2;
};
var operate = function (operator, num1, num2) {
    switch (operator) {
        case ("+"):
            return add(num1, num2);
            break;
        case ("*"):
            return multiply(num1, num2);
            break;
        case ("/"):
            return divide(num1, num2);
            break;
        default:
            return subtract(num1, num2);
            break;
    }
};
var saveValue = function (value) {
    // Check if there has been input
    if (!initialized) {
        // Check if first input is a number, and not 0 or an operator
        if (!firstNum) {
            if (value != "0" && Number(value)) {
                firstNum = value;
                inputString = value;
                initialized = true;
                screenEl.textContent = inputString;
                console.log("if", 1);
                return;
            }
            else {
                firstNum = "0";
                inputString = "0";
                initialized = true;
                screenEl.textContent = inputString;
                console.log("if", "1-1");
                return;
            }
        }
        else {
            if (value === "0" || Number(value)) {
                initialized = false;
                firstNum = "";
                console.log("if", "1-2");
                return saveValue(value);
            }
            else {
                console.log("if", "1-2-1");
                initialized = true;
                return saveValue(value);
            }
        }
    }
    if ((Number(value) || value == "0") && !operator && !lastNum) {
        if (value == "0" && firstNum == "0") {
            console.log("if", "2-1");
            return;
        }
        else if (Number(value) && firstNum == "0") {
            firstNum = value;
            inputString = value;
            screenEl.textContent = inputString;
            console.log("if", "2-2");
            return;
        }
        else {
            firstNum += value;
            inputString += value;
            screenEl.textContent = inputString;
            console.log("if", "2-3");
            return;
        }
        console.log("if", 2);
    }
    if (!Number(value) && !operator && value != "0") {
        operator = value;
        inputString += value;
        console.log("if", 3);
    }
    if ((Number(value) || value == "0") && operator) {
        lastNum ? lastNum += value : lastNum = value;
        inputString += value;
        console.log("if", 4);
    }
    if ((!Number(value) && value != "0") && firstNum && lastNum) {
        console.log(operate(operator, Number(firstNum), Number(lastNum)));
        totalSum = operate(operator, Number(firstNum), Number(lastNum));
        firstNum = totalSum.toString();
        lastNum = "";
        operator = value;
        inputString += value;
        console.log("if", 5);
        console.log("sum", totalSum);
    }
    screenEl.textContent = inputString;
};
var clearValues = function () {
    inputString = "0";
    firstNum = "";
    lastNum = "";
    operator = "";
    screenEl.textContent = inputString;
    initialized = false;
};
var registerInput = function (input) {
    switch (input.target.textContent) {
        case "C":
            clearValues();
            break;
        case "=":
            sum();
            break;
        default:
            saveValue(input.target.textContent);
            break;
    }
};
var sum = function () {
    console.log("sum");
    if (!lastNum) {
        return;
    }
    totalSum = operate(operator, Number(firstNum), Number(lastNum));
    firstNum = totalSum.toString();
    lastNum = "";
    operator = "";
    initialized = false;
    inputString = totalSum.toString();
    screenEl.textContent = totalSum.toString();
};
buttons.forEach((function (btn) { return (btn).addEventListener("click", function (e) { return registerInput(e); }); }));
