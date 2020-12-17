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

function checkSlope(xv, yv) {
  const coordinates = {
    x: 0,
    y: 0,
  };
  let treeHits = 0;

  let cell = grid.getCell(coordinates);
  while (cell !== undefined) {
    coordinates.x += xv;
    coordinates.y += yv;
    if (cell.isTree) treeHits += 1;
    cell = grid.getCell(coordinates);
  }
  return treeHits;
}

const product = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
].map((speeds) => checkSlope(...speeds)).reduce((acc, v) => acc * v);
console.log(product);
