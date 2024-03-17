var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var leftSide = [];
var rightSide = [];
var operator = null;
var inputString = "0";
var screenEl = document.querySelector(".screen");
var buttons = document.querySelectorAll("button");
var totalSum = null;
var floatButton = document.querySelector(".float");
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
// Save entered value and do operations based on the calculators current status
var saveValue = function (value) {
    // Determine if the value is a number or a dot
    var valueType = value === "." ? value : Number(value);
    // Check to see if value is an operator
    if (!Number(valueType) && value != "0" && value != ".") {
        // Enable dot for floating numbers
        floatButton.disabled = false;
        // Check if user operates on sum after pressing equals button
        if (totalSum) {
            leftSide = __spreadArray([], totalSum.toString().split(""), true);
            totalSum = null;
        }
        // Do calculation if left side and right side of operator has value. 
        if (leftSide.length && rightSide.length) {
            // Check for 0/0
            if (operator === "/" && leftSide.join("") === "0" && rightSide.join("") === "0") {
                screenEl.textContent = "ERROR";
                leftSide = [];
                rightSide = [];
                operator = "";
                return;
            }
            // Do the calculation and set the new value in leftSide and display the result
            leftSide = [Math.round(operate(operator, Number(leftSide.join("")), Number(rightSide.join(""))))];
            rightSide = [];
            screenEl.textContent = leftSide.toString() + value;
            operator = value;
            return;
            // Set operator if only left side is set.
        }
        else if (leftSide.length) {
            operator = value;
            screenEl.textContent = leftSide.join("") + operator;
            return;
            // Set operator and left side value to zero if starting with operator.
        }
        else {
            leftSide = [0];
            operator = value;
            screenEl.textContent = leftSide.join("") + operator;
            return;
        }
    }
    // If no operator yet, add input to left side.
    if (!operator) {
        // Return if repeting zero as first number.
        if (valueType === 0 && leftSide[0] === 0 && leftSide[1] != ".") {
            leftSide = [];
            return;
        }
        // Set first value to zero if starting with dot
        if (valueType === "." && !leftSide.length) {
            leftSide.push(0);
            floatButton.disabled = true;
        }
        // Stop trailing zeros.
        if (leftSide.length === 1 && leftSide[0] === 0 && Number(valueType)) {
            leftSide = [];
        }
        // Push values to leftSide variable
        leftSide.push(valueType);
        if (valueType === ".") {
            floatButton.disabled = true;
        }
        // Update output and reset totalsum
        screenEl.textContent = leftSide.join("");
        totalSum = null;
    }
    else { // Set right side.
        // Set zero as first number if starting with a dot
        if (valueType === "." && !rightSide.length) {
            rightSide.push("0");
            floatButton.disabled = true;
        }
        // Stop trailing zeros
        if (valueType === 0 && rightSide[0] === 0 && rightSide[1] != ".") {
            return;
        }
        // Remove zero as first value if not floating number to avoid trailing zeros before numbers
        if (rightSide.length === 1 && rightSide[0] === 0 && Number(valueType)) {
            rightSide = [];
        }
        // Push values to rightSide variable
        rightSide.push(valueType);
        if (valueType === ".") {
            floatButton.disabled = true;
        }
        // Update output
        screenEl.textContent = leftSide.join("").toString() + operator + rightSide.join("").toString();
    }
};
// Reset calculator 	
var clearValues = function () {
    totalSum = null;
    leftSide = [];
    rightSide = [];
    operator = "";
    floatButton.disabled = false;
    screenEl.textContent = "0";
};
// Register input
var registerInput = function (input) {
    switch (input) {
        case "C":
            clearValues();
            break;
        case "=":
            sum();
            break;
        case "<":
            deleteFunc();
            break;
        default:
            saveValue(input);
            break;
    }
};
// Delete function for backspace button
var deleteFunc = function () {
    console.log("test");
    // Delete on the left side
    if (!operator && !rightSide.length) {
        // If no numbers left, set zero
        if (leftSide.length === 1) {
            console.log("ttest2");
            leftSide = [0];
        }
        else if (!leftSide.length) {
            console.log("test");
            leftSide = [0];
        }
        else {
            leftSide.pop();
            // Disable dot if floating number
            if (leftSide.filter(function (el) { return el === "."; }).length) {
                floatButton.disabled = true;
            }
        }
        if (!leftSide.filter(function (el) { return el === "."; }).length) {
            floatButton.disabled = false;
        }
        screenEl.textContent = leftSide.join("").toString();
        // Delete from the right side
    }
    else if (operator && rightSide.length) {
        rightSide.pop();
        if (!rightSide.filter(function (el) { return el === "."; }).length) {
            floatButton.disabled = false;
        }
        screenEl.textContent = leftSide.join("").toString() + operator + rightSide.join("").toString();
    }
    else {
        // Delete operator
        operator = "";
        screenEl.textContent = leftSide.join("").toString();
        if (leftSide.filter(function (el) { return el === "."; }).length) {
            floatButton.disabled = true;
        }
    }
};
// Do a calculation when pressing equals button
var sum = function () {
    // If 0/0 - reset
    if (operator === "/" && leftSide.join("") === "0" && rightSide.join("") === "0") {
        screenEl.textContent = "ERROR";
        leftSide = [];
        rightSide = [];
        operator = "";
        floatButton.disabled = false;
        return;
    }
    // Calculate
    if (leftSide.length && rightSide.length && operator) {
        totalSum = Math.round(operate(operator, Number(leftSide.join("")), Number(rightSide.join(""))) * 10) / 10;
        screenEl.textContent = totalSum.toString();
        leftSide = __spreadArray([], totalSum.toString().split(""), true);
        rightSide = [];
        operator = "";
        floatButton.disabled = false;
    }
};
buttons.forEach((function (btn) { return (btn).addEventListener("click", function (e) { return registerInput(e.target.textContent); }); }));
window.addEventListener("keydown", function (e) {
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
        registerInput(e.key.toString());
    }
    else if (e.key === "," || e.key === ".") {
        registerInput(".");
    }
    else if (e.key === "/" || e.key === "*" || e.key === "-" || e.key === "+" || e.key === "," || e.key === ".") {
        registerInput(e.key);
    }
    else if (e.keyCode === 13) {
        registerInput("=");
    }
    else if (e.keyCode === 8) {
        deleteFunc();
    }
    else if (e.keyCode === 27) {
        clearValues();
    }
});
