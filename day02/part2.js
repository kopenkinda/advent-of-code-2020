const fs = require('fs');

const data = fs.readFileSync('./input.txt').toString().split('\n');

function checkValid(rawData) {
  const [rawPolicy, letterRaw, password] = rawData.split(' ');
  const policy = rawPolicy.split('-').map((x) => +x);
  const letter = letterRaw[0];
  if (
    (password[policy[0] - 1] === letter && password[policy[1] - 1] !== letter)
    || (password[policy[0] - 1] !== letter && password[policy[1] - 1] === letter)
  ) return true;
  return false;
}

let valid = 0;

data.forEach((piece) => {
  if (checkValid(piece)) {
    valid += 1;
  }
});
console.log(valid);
