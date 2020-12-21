const fs = require('fs');

const numbers = fs.readFileSync('./input.txt', 'utf-8')
  .split(',')
  .map((x) => +x);

function getN(game, n) {
  const turns = [...game];
  for (let i = game.length; i < n; i += 1) {
    const lastMove = turns[i - 1];
    const slice = turns.slice(0, i - 1);
    if (!slice.includes(lastMove)) {
      turns.push(0);
    } else {
      turns.push(i - slice.lastIndexOf(lastMove) - 1);
    }
  }
  return turns[turns.length - 1];
}

console.log(getN(numbers, 2020));
