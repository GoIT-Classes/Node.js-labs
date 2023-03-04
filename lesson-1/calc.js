// sum

// sub

// div

// mul

// node calc.js sum 3 2 4 // 9

// console.log(process.argv);

const [operator, ...args] = process.argv.slice(2);

// console.log(operator, args);

const numbers = args.map((item) => Number(item));

const calculate = (op, numbersArr) => {
  let result = null;

  switch (op) {
    case 'sum':
      result = numbersArr.reduce((total, number) => total + number);
      break;

    case 'sub':
      result = numbersArr.reduce((total, number) => total - number);
      break;

    case 'div':
      result = numbersArr.reduce((total, number) => total / number);
      break;

    case 'mult':
      result = numbersArr.reduce((total, number) => total * number);
      break;

    default:
      result = 'Unknown operation type';
      break;
  }

  return result;
};

console.log(calculate(operator, numbers));
