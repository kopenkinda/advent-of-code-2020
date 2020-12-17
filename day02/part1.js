const fs = require('fs');

const data = fs.readFileSync('./input.txt').toString().split('\n');

function checkValid(rawData) {
  const [rawPolicy, letterRaw, password] = rawData.split(' ');
  const policy = rawPolicy.split('-').map((x) => +x);
  const letter = letterRaw[0];
  const letters = password.split('').reduce((acc, v) => {
    if (acc[v]) {
      acc[v] += 1;
    } else {
      acc[v] = 1;
    }
    return acc;
  }, {});
  if (letters[letter] >= +policy[0] && letters[letter] <= +policy[1]) return true;
  return false;
}

let valid = 0;

data.forEach((piece) => {
  if (checkValid(piece)) {
    valid += 1;
  }
});
console.log(valid);
