let firstNum: string = null;
let lastNum: string= null;
let operator: string = null;
let initialized: boolean = false;
let inputString: string = "0";
let totalSum: number = 0;
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
	// Check if there has been input
	if(!initialized) {
		// Check if first input is a number, and not 0 or an operator
		if (value != "0" && Number(value)) { 
			firstNum = value; 
			inputString = value;
			initialized = true;
			screenEl.textContent = inputString;
			console.log("if", 1)
			return;
		} else {
			firstNum = "0";
			inputString = "0";
			initialized = true;
			screenEl.textContent = inputString;
			console.log("if", "1-1");
			return;
		}
	}
	if((Number(value) || value == "0") && !operator && !lastNum){
		if(value == "0" && firstNum == "0") {
			console.log("if", "2-1")
			return;
		} else if (Number(value) && firstNum == "0"){
			firstNum = value;
			inputString = value;
			screenEl.textContent = inputString;
			console.log("if", "2-2");
			return;
		} else {
			firstNum += value;
			inputString += value;
			screenEl.textContent = inputString;
			console.log("if", "2-3");
			return;
		}
		console.log("if", 2)
	}
	if(!Number(value) && !operator && value != "0") {
		operator = value;
		inputString += value;
		console.log("if", 3)
	}
	if((Number(value) || value == "0") && operator) {
		lastNum ? lastNum += value : lastNum = value;
		inputString += value;
		console.log("if", 4)
	}
	if((!Number(value) && value != "0") && firstNum && lastNum) {
		console.log(operate(operator, Number(firstNum), Number(lastNum)));
		totalSum = operate(operator, Number(firstNum), Number(lastNum));
		firstNum = totalSum.toString();
		lastNum = "";
		operator = value;
		inputString += value;	
		console.log("if", 5)
		console.log("sum", totalSum);
	}
	screenEl.textContent = inputString;
}

const clearValues = function(): void {
	inputString = "0";
	firstNum = "";
	lastNum = "";
	screenEl.textContent = inputString;
	initialized = false;
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
	if(!lastNum) {
		return;
	}
	totalSum = operate(operator, Number(firstNum), Number(lastNum));
	firstNum = "";
	lastNum = "";
	operator = "";
	screenEl.textContent = totalSum.toString()
	initialized: false;	
}

buttons.forEach((btn => (btn).addEventListener("click", (e) => registerInput(e) )));







