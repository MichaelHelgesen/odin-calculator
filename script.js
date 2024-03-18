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
var screenEl = document.querySelector(".screen");
var buttons = document.querySelectorAll("button");
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
// Register input
var registerInput = function (input) {
    switch (input) {
        case "C":
            reset();
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
    // Delete on the left side
    if (!operator && !rightSide.length) {
        if (!leftSide.length) {
            return;
        }
        // If no numbers left, set zero else pop
        leftSide.length === 1 ? leftSide = [0] : leftSide.pop();
        togglePointButton(leftSide);
        updateScreen(leftSide.join("").toString());
        // Delete from the right side
    }
    else if (operator && rightSide.length) {
        rightSide.pop();
        togglePointButton(rightSide);
        updateScreen(leftSide.join("").toString() + operator + rightSide.join("").toString());
        // Delete operator
    }
    else {
        operator = "";
        updateScreen(leftSide.join("").toString());
        togglePointButton(leftSide);
    }
};
// Reset calculator
var reset = function () {
    leftSide = [];
    rightSide = [];
    operator = "";
    floatButton.disabled = false;
    updateScreen("0");
};
var updateScreen = function (value) {
    screenEl.textContent = value;
};
var togglePointButton = function (array) {
    array.filter(function (el) { return el === "."; }).length ? floatButton.disabled = true : floatButton.disabled = false;
};
// Do a calculation when pressing equals button
var sum = function () {
    // If 0/0 - reset
    if (operator === "/" && leftSide.join("") === "0" && rightSide.join("") === "0") {
        reset();
        updateScreen("ERROR");
        return;
    }
    // Calculate
    if (leftSide.length && rightSide.length && operator) {
        var totalSum = Math.round(operate(operator, Number(leftSide.join("")), Number(rightSide.join(""))) * 10) / 10;
        reset();
        updateScreen(totalSum.toString());
        leftSide = __spreadArray([], totalSum.toString().split(""), true);
        togglePointButton(leftSide);
    }
};
// Save entered value and do operations based on the calculators current status
var saveValue = function (value) {
    // Determine if the value is a number or a dot
    var valueType = value === "." ? value : Number(value);
    // Check to see if value is an operator
    if (!Number(valueType) && value != "0" && value != ".") {
        // Do calculation if left side and right side of operator has value. 
        if (leftSide.length && rightSide.length) {
            // Check for 0/0
            if (operator === "/" && leftSide.join("") === "0" && rightSide.join("") === "0") {
                reset();
                updateScreen("ERROR");
                return;
            }
            // Do the calculation and set the new value in leftSide and display the result
            leftSide = [Math.round(operate(operator, Number(leftSide.join("")), Number(rightSide.join(""))))];
            rightSide = [];
            updateScreen(leftSide.toString() + value);
            operator = value;
            return;
            // Set operator if only left side is set.
        }
        else if (leftSide.length) {
            //Insert zero at the end if dot followed by operator
            if (leftSide[leftSide.length - 1] === ".") {
                leftSide.push("0");
            }
            operator = value;
            updateScreen(leftSide.join("") + operator);
            return;
            // Set operator and left side value to zero if starting with operator.
        }
        else {
            leftSide = [0];
            operator = value;
            updateScreen(leftSide.join("") + operator);
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
        // If starting with zero and continue with number without dot, replace dot with number.
        if (leftSide.length === 1 && leftSide[0] === 0 && Number(valueType)) {
            leftSide = [];
        }
        // Push values to leftSide variable
        leftSide.push(valueType);
        togglePointButton(leftSide);
        // Update output and reset totalsum
        updateScreen(leftSide.join(""));
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
        togglePointButton(rightSide);
        // Update output
        updateScreen(leftSide.join("").toString() + operator + rightSide.join("").toString());
    }
};
buttons.forEach((function (btn) { return (btn).addEventListener("click", function (e) { return registerInput(e.target.textContent); }); }));
window.addEventListener("keydown", function (e) {
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
        Number(e.key) || e.key === "0" ? registerInput(e.key.toString()) : null;
    }
    else if (e.key === "," || e.key === ".") {
        if (!floatButton.disabled) {
            registerInput(".");
        }
        ;
    }
    else if (e.key === "/" || e.key === "*" || e.key === "-" || e.key === "+") {
        registerInput(e.key);
    }
    else if (e.keyCode === 13) {
        registerInput("=");
    }
    else if (e.keyCode === 8) {
        deleteFunc();
    }
    else if (e.keyCode === 27) {
        reset();
    }
});
