class Cell {
  constructor(x, y, type) {
    if (type === '#') { this.tree = true; } else { this.tree = false; }
    this.x = x;
    this.y = y;
  }

  get isTree() {
    return this.tree;
  }
}

module.exports = {
  Cell,
};
