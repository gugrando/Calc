const numberButtons = document.querySelectorAll("[data-number]"); //Assim que se pega um atributo no qS
const operationButtons = document.querySelectorAll("[data-operator]");
const equalsButtons = document.querySelector("[data-equals]");
const deleteButtons = document.querySelector("[data-delete]");
const allClearButtons = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

// ------------------------------------------------------------------------------

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  formatDisplayNumber(number) {
    const stringNumber = number.toString();

    const integerNumber = parseFloat(stringNumber.split(".")[0]);
    const decimalNumber = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerNumber)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerNumber.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalNumber != null) {
      return `${integerDisplay}.${decimalNumber}`;
    } else {
      return integerDisplay;
    }
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  calculate() {
    let result;
    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

    switch (this.operation) {
      case "+":
        result = _previousOperand + _currentOperand;
        break;
      case "-":
        result = _previousOperand - _currentOperand;
        break;
      case "÷":
        result = _previousOperand / _currentOperand;
        break;
      case "*":
        result = _previousOperand * _currentOperand;
        break;
      default:
        return;
    }
    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = "";
  }

  chooseOperation(operation) {
    if (this.currentOperand == "") return;
    if (this.operation !== "") {
      this.calculate();
    }
    this.operation = operation;

    this.previousOperand = `${this.currentOperand}`;
    this.currentOperand = "";
  }

  appendNumber(number) {
    if (this.currentOperand.includes(".") & (number === ".")) return;
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  updateDislay() {
    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(
      this.previousOperand
    )}${this.operation || ""}`;
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(
      this.currentOperand
    );
  }
}

// ----------------------------------------------------------------------------

// instanciamos a classe calculator
const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// varremos os botões de n° e adicionamos evento de clique a eles
for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDislay();
  });
}
for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.chooseOperation(operationButton.innerText);
    calculator.updateDislay();
  });
}

allClearButtons.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDislay();
});

equalsButtons.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDislay();
});
deleteButtons.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDislay();
});
