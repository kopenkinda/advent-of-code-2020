class Bag {
  constructor(name) {
    this.name = name;
    this.parents = [];
    this.children = [];
    this.amounts = {};
  }

  addParent(bag) {
    this.parents.push(bag.name);
    this.parents = [...new Set(this.parents)];
  }

  addChild(bag) {
    this.children.push(bag.name);
    this.children = [...new Set(this.children)];
  }

  setAmountForChild(bag, amount) {
    if (!this.children.includes(bag.name)) {
      this.addChild(bag);
    }
    // console.log(this.name, bag.name, amount);
    this.amounts[bag.name] = amount;
    // console.log(this.amounts);
  }

  has(bag) {
    return this.children.includes(bag.name);
  }

  isChildOf(bag) {
    return this.parents.includes(bag.name);
  }

  merge(bag) {
    this.children = [...new Set([...this.children, ...bag.children])];
    this.parents = [...new Set([...this.parents, ...bag.parents])];
    this.amounts = { ...this.amounts, ...bag.amounts };
  }
}

module.exports = { Bag };
