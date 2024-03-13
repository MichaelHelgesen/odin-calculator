var firstNum = null;
var lastNum = null;
var operator = null;
var inputString = "0";
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
    if (!firstNum) {
        // Check if first input is a number, and not 0 or an operator
        if (value != "0" && Number(value)) {
            firstNum = value;
            lastNum = value;
            inputString = value;
        }
        // Return if user tries to enter several operators in a row
    }
    else if (!Number(lastNum) && (value != "0" && !Number(value))) {
        return;
    }
    else {
        inputString += value;
        lastNum = value;
    }
    screenEl.textContent = inputString;
    console.log(inputString);
};
var clearValues = function () {
    inputString = "0";
    firstNum = null;
    screenEl.textContent = inputString;
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
};
buttons.forEach((function (btn) { return (btn).addEventListener("click", function (e) { return registerInput(e); }); }));
