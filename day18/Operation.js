class Operation {
  constructor(left, right, op) {
    this.left = left;
    this.right = right;
    this.op = op;
  }

  exec() {
    const left = parseInt(this.left instanceof Operation ? this.left.exec() : this.left, 10);
    const right = parseInt(this.right instanceof Operation ? this.right.exec() : this.right, 10);
    switch (this.op) {
      case '-': {
        return left - right;
      }
      case '+': {
        return left + right;
      }
      case '*': {
        return left * right;
      }
      case '/': {
        return left / right;
      }
      default: {
        console.error(this.op);
        throw new Error('Unsupported operation');
      }
    }
  }
}

module.exports = { Operation };
