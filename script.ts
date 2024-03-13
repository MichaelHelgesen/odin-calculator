let firstNum: string = null;
let lastNum: number = null;
let operator: string = null;
let inputString: string = "0";
const screenEl: HTMLElement = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");

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
	if(!firstNum) {
		firstNum = value;
		inputString = value;
	} else {
		inputString += value;
	}
	screenEl.textContent = inputString;
}

const clearValues = function(): void {
	inputString = "0";
	firstNum = null;
	screenEl.textContent = inputString;
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
}

buttons.forEach((btn => (btn).addEventListener("click", (e) => registerInput(e) )));







