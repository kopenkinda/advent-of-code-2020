const fs = require('fs');

const data = fs.readFileSync('./input.txt').toString().split('\n').map((x) => parseInt(x, 10));

const first = {
  number: -1,
  index: -1,
};

const second = {
  number: -1,
  index: -1,
};

let shouldBreak = false;

for (let index1 = 0; index1 < data.length; index1 += 1) {
  first.number = data[index1];
  first.index = index1;
  for (let index2 = index1 + 1; index2 < data.length; index2 += 1) {
    if (shouldBreak) break;
    second.number = data[index2];
    second.index = index2;
    if (first.number + second.number === 2020) {
      shouldBreak = true;
      break;
    }
  }
  if (shouldBreak) break;
}

console.log({ first, second }, first.number + second.number, first.number * second.number);
