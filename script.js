var leftSide = [];
var rightSide = [];
var operator = null;
var initialized = false;
var inputString = "0";
var screenEl = document.querySelector(".screen");
var buttons = document.querySelectorAll("button");
var totalSum = null;
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
    var valueType = Number(value);
    // Check to see if value is number or operator.
    if (!Number(valueType) && value != "0") {
        console.log("operator");
        // Check if continuing calculations after pressing equals button
        if (totalSum) {
            console.log("totalSum", totalSum);
            leftSide = [totalSum];
            totalSum = null;
        }
        // Do calculation if left side and right side of operator has value. 
        if (leftSide.length && rightSide.length) {
            console.log("beggge tall lengde");
            if (operator === "/" && leftSide.join("") === "0" && rightSide.join("") === "0") {
                screenEl.textContent = "ERROR";
                leftSide = [];
                rightSide = [];
                operator = "";
                return;
            }
            leftSide = [Math.round(operate(operator, Number(leftSide.join("")), Number(rightSide.join(""))))];
            rightSide = [];
            screenEl.textContent = leftSide.toString() + value;
            operator = value;
            return;
            // Set operator if only left side is set.
        }
        else if (leftSide.length) {
            console.log("kun vestre tall og operator");
            operator = value;
            screenEl.textContent = leftSide.join("") + operator;
            return;
            // Set operator and left side value if starting with operator.
        }
        else {
            leftSide = [0];
            operator = value;
            screenEl.textContent = leftSide.join("") + operator;
            return;
        }
    }
    // Set left side as first value.
    if (!operator) {
        console.log("add to left");
        // Return if repeting zero as first number.
        if (valueType === 0 && leftSide[0] === 0) {
            console.log("Zeros");
            return;
        }
        // Stop trailing zeros
        if (leftSide[0] === 0) {
            leftSide = [];
        }
        console.log("push left");
        leftSide.push(valueType);
        screenEl.textContent = leftSide.join("");
        totalSum = null;
        // Set right side.
    }
    else {
        console.log("add to right");
        rightSide.push(valueType);
        screenEl.textContent = leftSide.join("").toString() + operator + rightSide.join("").toString();
    }
};
var clearValues = function () {
    totalSum = null;
    leftSide = [];
    rightSide = [];
    operator = "";
    screenEl.textContent = "0";
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
    if (operator === "/" && leftSide.join("") === "0" && rightSide.join("") === "0") {
        screenEl.textContent = "ERROR";
        leftSide = [];
        rightSide = [];
        operator = "";
        return;
    }
    if (leftSide.length && rightSide.length && operator) {
        totalSum = Math.round(operate(operator, Number(leftSide.join("")), Number(rightSide.join(""))) * 10) / 10;
        screenEl.textContent = totalSum.toString();
        leftSide = [];
        rightSide = [];
        operator = "";
        //saveValue(totalSum.toString());
    }
};
buttons.forEach((function (btn) { return (btn).addEventListener("click", function (e) { return registerInput(e); }); }));
