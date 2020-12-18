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

function findMinMax(arr) {
  return [Math.min(...arr), Math.max(...arr)];
}

function sumsTo(arr) {
  return arr.reduce((acc, v) => acc + v, 0);
}

const preambleLength = 25;
let found = 0;
let index = 0;

for (let i = 0; i < numbers.length - preambleLength; i += 1) {
  const arr = numbers.slice(i, i + preambleLength);
  const next = numbers[i + preambleLength];
  const shouldContinue = hasN(arr, next);
  if (!shouldContinue) {
    found = next;
    index = i;
    break;
  }
}

let done = false;

for (let i = 0; i < index && !done; i += 1) {
  for (let j = i; j < index && !done; j += 1) {
    const s = sumsTo(numbers.slice(i, j));
    if (s === found) {
      const minmax = findMinMax(numbers.slice(i, j));
      console.log(minmax[0] + minmax[1]);
      done = true;
      break;
    }
  }
}
