var historyData = [];
var expressionData = "";
var resultData = "";
var firstdata ="";
var op="";


    class Calculator {
        constructor(previousOperandTextElement, currentOperandTextElement) {
            this.previousOperandTextElement = previousOperandTextElement
            this.currentOperandTextElement = currentOperandTextElement
            this.clear()
        }

        appendNumber(number) {
            if (number === '.' && this.currentOperand.includes('.')) return
            this.currentOperand = this.currentOperand.toString() + number.toString()
            expressionData = number;
        }

        delete() {
            this.currentOperand = this.currentOperand.toString().slice(0, -1)
        }

        chooseOperation(operation) {
            if (this.currentOperand === '') return
            if (this.previousOperand !== '') {
                this.compute()
            }
            if (this.currentOperand !== '') {
                if (this.previousOperand !== '') {
                    this.calc()
                }
            }
            

            this.operation = operation
            this.previousOperand = this.currentOperand
            this.currentOperand = ''
        }

        clear() {
            this.currentOperand = ''
            this.previousOperand = ''
            this.operation = undefined
        }

        compute() {
            let computation
            const prev = parseFloat(this.previousOperand)
            const current = parseFloat(this.currentOperand)
            if (isNaN(prev) || isNaN(current)) return
            switch (this.operation) {
                case '+':
                    computation = prev + current
                    op=" + ";
                    break
                case '-':
                    computation = prev - current
                    op=" - ";
                    break
                case '*':
                    computation = prev * current
                    op=" * ";
                    break
                case '÷':
                    computation = prev / current
                    op=" ÷ ";
                    break
                default:
                    return
            }
            this.currentOperand = computation
            this.operation = undefined
            this.previousOperand = ''
            resultData = computation;
            firstdata= prev;
            historyData.push({"data":firstdata,"operation":op,"expression":expressionData,"result":resultData});
            showHistory();
            resultData="";
            expressionData="";
            firstdata="";
            op="";
        }

        calc() {
            let computation
            const prev = parseFloat(this.previousOperand)
            switch (this.operation) {

                case '+/-':
                    computation = -prev
                    op=" +/- ";
                    break
                case '%':
                    computation = prev / 100
                    op=" % ";
                    break
                case '√¯':
                    computation = Math.sqrt(prev)
                    op=" √¯ ";
                    break
                case '1/x':
                    computation = 1 / prev
                    op=" 1/x ";
                    break
                default:
                    return
            }

            this.currentOperand = computation
            this.operation = undefined
            this.previousOperand = ''
            resultData = computation;
            firstdata= prev;
            historyData.push({"data":firstdata,"operation":op,"result":resultData});
            History();
            resultData="";
            firstdata="";
            op="";
        }


        getDisplayNumber(number) {
            const stringNumber = number.toString()
            const integerDigits = parseFloat(stringNumber.split('.')[0])
            const decimalDigits = stringNumber.split('.')[1]
            let integerDisplay
            if (isNaN(integerDigits)) {
                integerDisplay = ''
            } else {
                integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
            }
            if (decimalDigits != null) {
                return `${integerDisplay}.${decimalDigits}`
            } else {
                return integerDisplay
            }
        }

        updateDisplay() {
            this.currentOperandTextElement.innerText =
                this.getDisplayNumber(this.currentOperand)
            if (this.operation != null) {
                this.previousOperandTextElement.innerText =
                    `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
            } else {
                this.previousOperandTextElement.innerText = ''
            }
        }

    }

function History() {
    var log = document.getElementById("his");
    var string = "";
    for (var key in historyData) {
        string +=
            historyData[key]["data"] +
            "" +
            historyData[key]["operation"]+

            " = " +
            historyData[key]["result"] +
            "<br>";
    }

    log.innerHTML = string;
}

function showHistory() {
    var log = document.getElementById("his");
    var string = "";
    for (var key in historyData) {
        string +=
            historyData[key]["data"] +
            "" +
            historyData[key]["operation"]+
            "" +
            historyData[key]["expression"] +
            " = " +
            historyData[key]["result"] +
            "<br>";
    }
     log.innerHTML = string;
}


    const numberButtons = document.querySelectorAll('[data-number]')
    const operationButtons = document.querySelectorAll('[data-operation]')
    const allClearButton = document.querySelector('[data-all-clear]')
    const previousOperandTextElement = document.querySelector('[data-previous-operand]')
    const currentOperandTextElement = document.querySelector('[data-current-operand]')
    const equalsButton = document.querySelector('[data-equals]')
    const deleteButton = document.querySelector('[data-delete]')

    const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

    allClearButton.addEventListener('click', button => {
        calculator.clear()
        calculator.updateDisplay()
    })

    deleteButton.addEventListener('click', button => {
        calculator.delete()
        calculator.updateDisplay()
    })

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.appendNumber(button.innerText)
            calculator.updateDisplay()
        })
    })

    operationButtons.forEach(button => {
        button.addEventListener('click', () => {
            calculator.chooseOperation(button.innerText)
            calculator.updateDisplay()
        })
    })

    equalsButton.addEventListener('click', button => {
        calculator.compute()
        calculator.updateDisplay()
        calculator.calc()
    })


