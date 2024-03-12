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
var firstNum = null;
var lastNum = null;
var operator = null;
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
