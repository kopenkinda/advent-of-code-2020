const fs = require('fs');
const { Operation } = require('./Operation');

const lines = fs.readFileSync('./input.txt', 'utf-8').split('\n');

function createOps(data) {
  if (data.length === 3 && !(data[0] instanceof Array) && !(data[2] instanceof Array)) {
    return new Operation(data[0], data[2], data[1]);
  }
  let right;
  let left;
  const rightIndex = data.length - 1;
  const leftIndex = data.length - 3;
  const op = data[data.length - 2];
  if (data[rightIndex] instanceof Array) {
    right = createOps(data[rightIndex]);
  } else {
    right = data[rightIndex];
  }
  if (data.length === 3) {
    if (data[leftIndex] instanceof Array) {
      left = createOps(data[leftIndex]);
    } else {
      left = data[leftIndex];
    }
  } else {
    left = createOps(data.slice(0, -2));
  }
  return new Operation(left, right, op);
}

function formatLine(line) {
  const chars = line.split(' ').join('').split('');
  let ret = '[';
  chars.forEach((character, i) => {
    if (character === '(') ret += '[';
    else if (character === ')') {
      ret += ']';
      if (![')', undefined].includes(chars[i + 1])) ret += ',';
    } else {
      ret += `"${character}"`;
      if (![')', undefined].includes(chars[i + 1])) ret += ',';
    }
  });
  return JSON.parse(`${ret}]`);
}

const finalSumm = lines.reduce((acc, line) => {
  const formatted = formatLine(line);
  const op = createOps(formatted);
  return acc + op.exec();
}, 0);

console.log(finalSumm);
