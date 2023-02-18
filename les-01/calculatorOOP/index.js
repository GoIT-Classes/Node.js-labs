const Calculator = require('./Calculator');
const { operator, numbers } = require('./fetchData');

const calculator = new Calculator(operator, numbers);

console.log(calculator.init());
