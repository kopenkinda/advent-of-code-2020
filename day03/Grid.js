const { Cell } = require('./Cell');

class Grid {
  constructor() {
    this.cells = [];
  }

  setCell(x, y, type) {
    if (this.cells[x] === undefined) { this.cells[x] = []; }
    this.cells[x][y] = new Cell(x, y, type);
  }

  getCell({ x, y }) {
    if (this.cells[x] === undefined) {
      const { length } = this.cells;
      return this.cells[x % length][y];
    }
    return this.cells[x][y];
  }
}

module.exports = {
  Grid,
};
