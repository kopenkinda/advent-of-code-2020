class BagHolder {
  constructor() {
    this.bags = new Map();
  }

  addBag(bag) {
    if (!this.bags.has(bag.name)) {
      // const bags = [...this.bags.keys()];
      this.bags.set(bag.name, bag);
    } else {
      this.bags.get(bag.name).merge(bag);
    }
  }

  getBag(name) {
    return this.bags.get(name);
  }

  getAllParentsOf(name) {
    const bag = this.getBag(name);
    const { parents } = bag;
    if (parents.length === 0) return name;
    const allParents = parents.map((p) => this.getAllParentsOf(p));
    // eslint-disable-next-line prefer-spread
    return [...new Set([].concat.apply([], allParents).concat(parents))];
  }

  getChildrenCount(name) {
    const bag = this.getBag(name);
    const { children, amounts } = bag;
    if (children.length === 0) {
      return 1;
    }
    return children.reduce((acc, v) => acc + amounts[v] * this.getChildrenCount(v), 0) + 1;
  }
}

module.exports = { BagHolder };
