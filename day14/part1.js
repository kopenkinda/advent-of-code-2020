const fs = require('fs');

const actions = fs.readFileSync('./input.txt', 'utf-8')
  .split('\n')
  .filter((x) => x.trim() !== '')
  .reduce((acc, v) => {
    if (v.startsWith('mask')) {
      acc.items.push({
        mask: v.slice(7),
        elms: [],
      });
      acc.currentIndex += 1;
    } else {
      const s = v.split('] = ');
      acc.items[acc.currentIndex].elms.push({
        index: +s[0].slice(4),
        value: +s[1],
      });
    }
    return acc;
  }, {
    currentIndex: -1,
    items: [],
  }).items;

let currentMask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

const memory = new Map();

function masked(el) {
  const bin = el.toString(2).padStart(currentMask.length, 0).split('');
  let ret = '';
  for (let i = 0; i < bin.length; i += 1) {
    ret += currentMask[i] === 'X' ? bin[i] : currentMask[i];
  }
  return parseInt(ret, 2);
}

actions.forEach((action) => {
  currentMask = action.mask;
  action.elms.forEach((elmt) => {
    memory.set(elmt.index, masked(elmt.value));
  });
});

console.log([...memory].reduce((acc, v) => acc + v[1], 0));
