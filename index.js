let buffer = "0";
let runningNumber = 0;
let previousOperator = null;
const screenEl = document.querySelector(".screen")

function renderScreen() {
  screenEl.innerText = buffer
}


function handleClear() {
  buffer = "0"
  runningNumber = 0;
  previousOperator = null;
}

function handleBackSpace() {
  if (buffer.length === 1) {
    buffer = "0"
  } else {
    buffer = buffer.substring(0, buffer.length - 1)
  }
}


function flushOperation() {
  const intBuffer = parseInt(buffer)
  
  if (previousOperator === "+") {
    runningNumber += intBuffer
  } else if (previousOperator === "-") {
    runningNumber -= intBuffer
  } else if (previousOperator === "÷") {
    runningNumber /= intBuffer
  } else if (previousOperator === "×") {
    runningNumber *= intBuffer
  }
}


function handleEqual() {
  if (previousOperator === null) {
    return
  }

  intBuffer = parseInt(buffer)
  
  flushOperation(intBuffer)
  previousOperator = null
  buffer = "" + runningNumber
  runningNumber = 0

}

function handleMath (operator) {
  if (buffer === "0") {
    return
  }

  if (previousOperator !== null) {
    flushOperation()
  } else {
    runningNumber = parseInt(buffer)
  }
  buffer = "0"
  previousOperator = operator
}

function handleSymbol (symbol) {
  switch(symbol) {
    case "C":
      handleClear()
      break
    case "←":
      handleBackSpace()
      break
    case "=":
      handleEqual()
      break
    case "+":
    case "-":
    case "÷":
    case "×":
      handleMath(symbol)
      break

  }
}

function handleNumber (number) {
  if (buffer === "0") {
    buffer = number
  } else {
    buffer += number
  }
}

function handleButtonClick (value) {
  if (isNaN(value)) {
    handleSymbol(value)
  } else {
    handleNumber(value)
  }
  renderScreen()
}

function init() {
  const buttonsEl = document.querySelector(".buttons")
  buttonsEl.addEventListener('click', (e) => {
    handleButtonClick(e.target.innerText)
  })
  renderScreen()
}

init()