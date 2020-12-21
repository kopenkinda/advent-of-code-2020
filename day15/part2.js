const fs = require('fs');

const numbers = fs.readFileSync('./input.txt', 'utf-8')
  .split(',')
  .map((x) => +x);

function getN(g, n) {
  const memory = new Map();
  let turn = 1;
  let lastTurn = 0;
  g.forEach((t) => {
    memory.set(t, [turn]);
    lastTurn = t;
    turn += 1;
  });

  while (turn <= n) {
    let newTurn;
    if (memory.has(lastTurn)) {
      newTurn = turn - 1 - memory.get(lastTurn);
    } else {
      newTurn = 0;
    }
    memory.set(lastTurn, turn - 1);
    lastTurn = newTurn;
    turn += 1;
  }
  return lastTurn;
}

const goal = 1000000;
const n = getN(numbers, goal);
console.log(n);
