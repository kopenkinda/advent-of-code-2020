class RangeGroup {
  constructor([rangeLeft, rangeRight]) {
    this.left = rangeLeft;
    this.right = rangeRight;
  }

  isWithin(n) {
    return this.left.isWithin(n) || this.right.isWithin(n);
  }
}

module.exports = { RangeGroup };
