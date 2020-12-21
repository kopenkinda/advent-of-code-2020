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

let currentMask = '000000000000000000000000000000000000';

const memory = new Map();

const permutator = (inputArr) => {
  const result = [];
  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice();
        const next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };
  permute(inputArr);
  return result;
};

const getPermutations = (l) => {
  const res = new Set();
  for (let i = 0; i <= l; i += 1) {
    const input = '1'.repeat(l - i) + '0'.repeat(i);
    permutator(input.split('')).forEach((v) => res.add(v.join('')));
  }
  return [...res];
};

function getXcount(s) {
  return s.length - s.split('X').join('').length;
}

function masked(el) {
  const bin = el.toString(2).padStart(currentMask.length, 0);
  let ret = '';
  for (let i = 0; i < bin.length; i += 1) {
    ret += currentMask[i] === '0' ? bin[i] : currentMask[i];
  }
  return ret;
}
function replaceX(mask, perms) {
  return perms.map((v) => {
    let is = 0;
    let r = '';
    for (let i = 0; i < mask.length; i += 1) {
      if (mask[i] === 'X') {
        r += v[is];
        is += 1;
      } else {
        r += mask[i];
      }
    }
    return r;
  });
}

actions.forEach((action) => {
  currentMask = action.mask;
  action.elms.forEach((elmt) => {
    const maskedEl = masked(elmt.index);
    const x = getXcount(maskedEl);
    const perms = getPermutations(x);
    const v2 = replaceX(maskedEl, perms);
    v2.forEach((xd) => memory.set(xd, elmt.value));
  });
});

console.log([...memory].reduce((acc, v) => acc + v[1], 0));
