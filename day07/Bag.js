class Bag {
  constructor(name) {
    this.name = name;
    this.parents = [];
    this.children = [];
  }

  addParent(bag) {
    this.parents.push(bag.name);
  }

  addChild(bag) {
    this.children.push(bag.name);
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
  }
}

module.exports = { Bag };
