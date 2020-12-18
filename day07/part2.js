const fs = require('fs');
const { Bag } = require('./Bag');
const { BagHolder } = require('./BagHolder');

const lines = fs.readFileSync('./input.txt').toString().split('\n');

const bags = new BagHolder();

function getMetaBag(rawBag) {
  const bag = {
    name: '',
    contains: [

    ],
  };
  const [name, otherBags] = rawBag.split(' contain ');
  bag.name = name.slice(0, -5);
  if (otherBags !== 'no other bags.') {
    bag.contains = otherBags.slice(0, -1).split(', ')
      .map((otherRawBag) => {
        const [amount, ...otherBagNameRaw] = otherRawBag.split(' ');
        const otherBagName = otherBagNameRaw.join(' ');
        return ({
          name: otherBagName.slice(0, otherBagName.indexOf('bags') !== -1 ? -5 : -4),
          amount: +amount,
        });
      });
  }
  return bag;
}

lines.forEach((line) => {
  const meta = getMetaBag(line);
  const bag = new Bag(meta.name);
  meta.contains
    .forEach((otherBagMeta) => {
      const otherBag = new Bag(otherBagMeta.name);
      otherBag.addParent(bag);
      bag.setAmountForChild(otherBag, otherBagMeta.amount);
      bags.addBag(otherBag);
      bag.addChild(otherBag);
    });
  bags.addBag(bag);
});

// console.log(bags.getAllParentsOf('shiny gold').length);
console.log(bags.getChildrenCount('shiny gold') - 1);
