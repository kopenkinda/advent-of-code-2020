const fs = require('fs');
const { Ship } = require('./Ship');
const { Waypoint } = require('./Waypoint');

const moves = fs.readFileSync('./input.txt', 'utf-8')
  .split('\n')
  .filter((x) => x.trim() !== '')
  .map((x) => ({
    action: x[0],
    amount: +x.slice(1),
  }));

function manhattan(mvs) {
  const ship = new Ship();
  const waypoint = new Waypoint(ship);

  mvs.forEach(({ action, amount }, i) => {
    switch (action) {
      case 'F': {
        ship.moveToWaypoint(waypoint, amount);
        break;
      }
      case 'N': {
        waypoint.north(amount);
        break;
      }
      case 'E': {
        waypoint.east(amount);
        break;
      }
      case 'S': {
        waypoint.south(amount);
        break;
      }
      case 'W': {
        waypoint.west(amount);
        break;
      }
      case 'L': {
        waypoint.turnLeft(amount);
        break;
      }
      case 'R': {
        waypoint.turnRight(amount);
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
