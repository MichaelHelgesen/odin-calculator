let leftSide: number[] = [];
let rightSide: number[] = [];
let operator: string = null;
let initialized: boolean = false;
let inputString: string = "0";
const screenEl: HTMLElement = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");
let totalSum = null;
const add = function(num1: number, num2: number): number {
	return num1 + num2;
};
const subtract = function(num1: number, num2: number): number {
	return num1 - num2;
}
const divide = function(num1: number, num2: number):number {
	return num1 / num2;
}
const multiply = function(num1:number, num2: number): number {
	return num1 * num2;
}
const operate = function(operator: string, num1: number, num2: number): number {
	switch(operator) {
		case("+"): return add(num1, num2);
		break;
		case("*"): return multiply(num1, num2);
		break;
		case("/"): return divide(num1, num2);
		break;
		default: return subtract(num1, num2);
		break;
	}
}

const saveValue = function(value: string): void {
	const valueType = Number(value);

	// Check to see if value is number or operator.
	if(!Number(valueType) && value != "0") {
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
			leftSide = [Math.round(operate(operator, Number(leftSide.join("")), Number(rightSide.join(""))))]
			rightSide = [];
			screenEl.textContent = leftSide.toString() + value;
			operator = value;
			return;
		// Set operator if only left side is set.
		} else if (leftSide.length) {
			console.log("kun vestre tall og operator")
			operator = value;
			screenEl.textContent = leftSide.join("") + operator;
			return;
		// Set operator and left side value if starting with operator.
		} else {
			leftSide = [0]
			operator = value;
			screenEl.textContent = leftSide.join("") + operator;
			return;
		}
	}
	// Set left side as first value.
	if(!operator){
		console.log("add to left");
		// Return if repeting zero as first number.
		if(valueType === 0 && leftSide[0] === 0) {
			console.log("Zeros")
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
	} else {
		console.log("add to right");
		rightSide.push(valueType);
		screenEl.textContent = leftSide.join("").toString() + operator + rightSide.join("").toString();
	}
}

const clearValues = function(): void {
	totalSum = null;
	leftSide =[];
	rightSide = [];
	operator = "";
	screenEl.textContent = "0";
}

const registerInput = function (input): void {
	switch(input.target.textContent) {
		case "C": clearValues(); 
		break;
		case "=": sum();
		break;
		default: saveValue(input.target.textContent); 
		break;
	}
}

const sum = function(): void {
	console.log("sum");
	if (operator === "/" && leftSide.join("") === "0" && rightSide.join("") === "0") {
		screenEl.textContent = "ERROR";
		leftSide = [];
		rightSide = [];
		operator = "";
		return;
	}
	if(leftSide.length && rightSide.length && operator) {
		totalSum = Math.round(operate(operator, Number(leftSide.join("")), Number(rightSide.join(""))) * 10) / 10;
		screenEl.textContent = totalSum.toString();
		leftSide = [];
		rightSide = [];
		operator = "";
		//saveValue(totalSum.toString());
	}
}

buttons.forEach((btn => (btn).addEventListener("click", (e) => registerInput(e) )));







