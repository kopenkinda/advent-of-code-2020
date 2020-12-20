const fs = require('fs');
const { Ship } = require('./Ship');

const moves = fs.readFileSync('./input.txt', 'utf-8')
  .split('\n')
  .filter((x) => x.trim() !== '')
  .map((x) => ({
    action: x[0],
    amount: +x.slice(1),
  }));

function manhattan(moves) {
  const ship = new Ship();

  moves.forEach(({ action, amount }) => {
    switch (action) {
      case 'F': {
        ship.forward(amount);
        break;
      }
      case 'N': {
        ship.north(amount);
        break;
      }
      case 'E': {
        ship.east(amount);
        break;
      }
      case 'S': {
        ship.south(amount);
        break;
      }
      case 'W': {
        ship.west(amount);
        break;
      }
      case 'L': {
        ship.turnLeft(amount);
        break;
      }
      case 'R': {
        ship.turnRight(amount);
        break;
      }
      default: {
        break;
      }
    }
  });

  return ship.manhattan();
}

console.log(manhattan(moves));
