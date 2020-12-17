const fs = require('fs');
const { Grid } = require('./Grid');

const grid = new Grid();

fs.readFileSync('./input.txt')
  .toString()
  .split('\n')
  .forEach(
    (line, y) => line
      .split('')
      .forEach((character, x) => grid.setCell(x, y, character)),
  );

const coordinates = {
  x: 0,
  y: 0,
};
let treeHits = 0;

let cell = grid.getCell(coordinates);
while (cell !== undefined) {
  coordinates.x += 3;
  coordinates.y += 1;
  if (cell.isTree) treeHits += 1;
  cell = grid.getCell(coordinates);
}

console.log(treeHits);
