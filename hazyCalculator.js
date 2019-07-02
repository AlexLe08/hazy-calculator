function isSkippedValue(value) {
  //undefined and empty strings should be ignored
  if (value === undefined || value === '') {
    return true
  }
  //checks for operators as well
  const operators = ['+', '-', '*', '/']
  if (operators.includes(value) ) {
    return false
  }
  return !value
}

function isNumericValue(value) {
  // stringified numbers and NULL should count as numbers
  if ( value === null){
    return true
  }
  // also check for empty strings and undefined 
  else if ( value === '' || value === undefined) {
    return false
  }
  else {
    return !isNaN(value)
  }
  
}

function isNothingValue(value) {
  return value === null || value === undefined
}

function isAcceptableValue(value) {
  // Must be a number or operator
  const operators = ['+', '-', '*', '/']
  return typeof Number(value) === 'number' || operators.includes(value)
}

function performCalculationStep(firstOperand, operator, secondOperand) {
  switch (operator) {
    case '+':
      return firstOperand + secondOperand
    case '-':
      return firstOperand - secondOperand
    case '*':
      return firstOperand * secondOperand
    case '/':
      return firstOperand / secondOperand
    default:
      throw new Error('Invalid input!')
  }
}

module.exports.calculate = function (calculationSteps) {
  var total
  var operator

  calculationSteps.forEach(nextCalculationStep => {
    if (!isAcceptableValue(nextCalculationStep)) {
      throw new Error('Invalid input!')
    }

    if (isNothingValue(total) && isNumericValue(nextCalculationStep)) {
      total = Number(nextCalculationStep)

    } else if (isNothingValue(operator) && !isSkippedValue(nextCalculationStep)) {
      operator = nextCalculationStep

    } else if (isNumericValue(nextCalculationStep)) {
      total = performCalculationStep(total, operator, Number(nextCalculationStep))
      operator = null

    } else if (!isSkippedValue(nextCalculationStep)) {
      throw new Error('Invalid input!')
    }
  })

  return total
}
