var leftSide = [];
var rightSide = [];
var operator = null;
var initialized = false;
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
var saveValue = function (value) {
    console.log("VALUE", value);
    var valueType = value === "." ? value : Number(value);
    // Check to see if value is number or operator.
    if (!Number(valueType) && value != "0" && value != ".") {
        console.log("operator");
        floatButton.disabled = false;
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
        if (valueType === 0 && leftSide[0] === 0 && leftSide[1] != ".") {
            console.log("Zeros");
            leftSide = [];
            return;
        }
        if (valueType === "." && !leftSide.length) {
            console.log("start punktum");
            leftSide.push("0");
            floatButton.disabled = true;
        }
        console.log("push left");
        if (leftSide.length === 1 && leftSide[0] === 0 && Number(valueType)) {
            console.log("reset");
            leftSide = [];
        }
        leftSide.push(valueType);
        if (valueType === ".") {
            floatButton.disabled = true;
        }
        screenEl.textContent = leftSide.join("");
        totalSum = null;
        // Set right side.
    }
    else {
        console.log("add to right");
        // Return if repeting zero as first number.
        if (valueType == "." && !rightSide.length) {
            rightSide.push("0");
            floatButton.disabled = true;
        }
        if (valueType === 0 && rightSide[0] === 0 && rightSide[1] != ".") {
            console.log("Zeros");
            return;
        }
        if (rightSide.length === 1 && rightSide[0] === 0 && Number(valueType)) {
            rightSide = [];
        }
        rightSide.push(valueType);
        if (valueType === ".") {
            floatButton.disabled = true;
        }
        screenEl.textContent = leftSide.join("").toString() + operator + rightSide.join("").toString();
    }
};
var clearValues = function () {
    totalSum = null;
    leftSide = [];
    rightSide = [];
    operator = "";
    floatButton.disabled = false;
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
        case "<":
            deleteFunc();
            break;
        default:
            saveValue(input.target.textContent);
            break;
    }
};
var deleteFunc = function () {
    //	if (totalSum) {
    //		leftSide = totalSum.toString().split("");
    //		totalSum = null;
    //leftSide = [leftSide.split("")];
    //	}
    console.log(leftSide);
    console.log("delete");
    if (!operator && !rightSide.length) {
        console.log("no oper no right");
        if (leftSide.length === 1) {
            console.log("length 1");
            leftSide = [0];
        }
        else if (!leftSide.length) {
            leftSide = [0];
        }
        else {
            if (leftSide.filter(function (el) { return el === "."; }).length) {
                floatButton.disabled = true;
            }
            leftSide.pop();
        }
        if (!leftSide.filter(function (el) { return el === "."; }).length) {
            floatButton.disabled = false;
        }
        screenEl.textContent = leftSide.join("").toString();
    }
    else if (operator && rightSide.length) {
        rightSide.pop();
        if (!rightSide.filter(function (el) { return el === "."; }).length) {
            floatButton.disabled = false;
        }
        screenEl.textContent = leftSide.join("").toString() + operator + rightSide.join("").toString();
    }
    else {
        operator = "";
        screenEl.textContent = leftSide.join("").toString();
    }
};
var sum = function () {
    console.log("sum");
    if (operator === "/" && leftSide.join("") === "0" && rightSide.join("") === "0") {
        screenEl.textContent = "ERROR";
        leftSide = [];
        rightSide = [];
        operator = "";
        floatButton.disabled = false;
        return;
    }
    if (leftSide.length && rightSide.length && operator) {
        totalSum = Math.round(operate(operator, Number(leftSide.join("")), Number(rightSide.join(""))) * 10) / 10;
        screenEl.textContent = totalSum.toString();
        leftSide = [];
        rightSide = [];
        operator = "";
        floatButton.disabled = false;
        //saveValue(totalSum.toString());
    }
};
buttons.forEach((function (btn) { return (btn).addEventListener("click", function (e) { return registerInput(e); }); }));
