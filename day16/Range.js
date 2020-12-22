class Range {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  static check(value, { min, max }) {
    return value >= min && value <= max;
  }

  isWithin(n) {
    return Range.check(n, { ...this });
  }
}

module.exports = { Range };
