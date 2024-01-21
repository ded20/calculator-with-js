const resultElement = document.getElementById('result');
let currentInput = '';

function appendValue(value) {
    currentInput += value;
    updateResult();
  }

function appendOperator(operator) {
    if (currentInput !== '' && !isOperator(currentInput.charAt(currentInput.length - 1))) {
      currentInput += operator;
      updateResult();
    }
  }

function clearResult() {
    currentInput = '';
    updateResult();
  }

function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateResult();
  }

function calculateResult() {
    try {
      currentInput = eval(currentInput).toString();
      updateResult();
    } catch (error) {
      currentInput = 'Error';
      updateResult();
    }
  }

function addDecimalPoint() {
    const lastNumber = currentInput.split(/[-+\/*]/).pop();
  
    if (!lastNumber.includes('.')) {
    currentInput += '.';
    updateResult();
    }
  }


function addPercentage() {
    if (currentInput !== '') {
      currentInput = (parseFloat(currentInput) / 100).toString();
      updateResult();
    }
  }

// function toggleSign() {
//     const lastOperatorIndex = Math.max(
//       currentInput.lastIndexOf('+'),
//       currentInput.lastIndexOf('-'),
//       currentInput.lastIndexOf('*'),
//       currentInput.lastIndexOf('/')
//     );
  
//     if (lastOperatorIndex !== -1) {
//       const numberAfterOperator = currentInput.substring(lastOperatorIndex + 1);
//       const toggledNumber = (parseFloat(numberAfterOperator) * -1).toString();
//       currentInput = currentInput.substring(0, lastOperatorIndex + 1) + toggledNumber;
//       updateResult();
//     } else {
//       // If no operator is found, toggle the sign of the entire input
//       currentInput = (parseFloat(currentInput) * -1).toString();
//       updateResult();
//     }
//   }

function updateResult() {
    resultElement.value = currentInput;
  }

function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
  }

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
  }

document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (/[0-9]/.test(key)) {
      appendValue(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
      appendOperator(key);
    } else if (key === 'Enter') {
      calculateResult();
    } else if (key === 'Escape' || key === 'c') {
      clearResult();
    } else if (key === 'Backspace') {
      backspace();
    } else if (key === '.') {
      addDecimalPoint();
    } else if (key === '%') {
      addPercentage();
    }
});