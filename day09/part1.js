const fs = require('fs');

const numbers = fs.readFileSync('./input.txt', 'utf-8').split('\n').map((x) => parseInt(x, 10));

function hasN(arr, n) {
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = i + 1; j < arr.length; j += 1) {
      if (arr[i] + arr[j] === n) return true;
    }
  }
  return false;
}

const preambleLength = 25;

for (let i = 0; i < numbers.length - preambleLength; i += 1) {
  const arr = numbers.slice(i, i + preambleLength);
  const next = numbers[i + preambleLength];
  const shouldContinue = hasN(arr, next);
  if (!shouldContinue) {
    console.log(next);
    break;
  }
}
