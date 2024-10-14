const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".buttons button");

let currentNumber = "";
let firstOperand = null;
let operator = null;
let restart = false;

function updateResult(originClear = false) {
  result.innerText = originClear ? 0 : currentNumber.replace(".", ",");
}

function addDigit(digit) {
  if (digit === "," && (currentNumber.includes(",") || !currentNumber)) return;

  currentNumber = restart ? digit : currentNumber + digit;
  restart = false;
  updateResult();
}

function setOperator(newOperator) {
  if (currentNumber) {
    calculate();
    firstOperand = parseFloat(currentNumber.replace(",", "."));
    currentNumber = "";
  }
  operator = newOperator;
}

function calculate() {
  if (operator === null || firstOperand === null) return;

  const secondOperand = parseFloat(currentNumber.replace(",", "."));
  const resultValue = operate(firstOperand, secondOperand, operator);
  
  currentNumber = formatResult(resultValue);
  resetCalculator();
  updateResult();
}

function operate(first, second, op) {
  switch (op) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "x":
      return first * second;
    case "÷":
      return first / second;
    default:
      return null;
  }
}

function formatResult(value) {
  return value.toString().split(".")[1]?.length > 5 
    ? parseFloat(value.toFixed(5)).toString() 
    : value.toString();
}

function resetCalculator() {
  operator = null;
  firstOperand = null;
  restart = true;
}

function clearCalculator() {
  currentNumber = "";
  firstOperand = null;
  operator = null;
  updateResult(true);
}

function setPercentage() {
  let resultValue = parseFloat(currentNumber) / 100;
  if (["+", "-"].includes(operator)) {
    resultValue *= firstOperand || 1;
  }
  currentNumber = formatResult(resultValue);
  updateResult();
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const buttonText = button.innerText;
    if (/^[0-9,]+$/.test(buttonText)) {
      addDigit(buttonText);
    } else if (["+", "-", "x", "÷"].includes(buttonText)) {
      setOperator(buttonText);
    } else if (buttonText === "=") {
      calculate();
    } else if (buttonText === "C") {
      clearCalculator();
    } else if (buttonText === "±") {
      currentNumber = (parseFloat(currentNumber || firstOperand) * -1).toString();
      updateResult();
    } else if (buttonText === "%") {
      setPercentage();
    }
  });
});
