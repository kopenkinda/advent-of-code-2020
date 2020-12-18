const fs = require('fs');

const jolts = fs.readFileSync('./input.txt', 'utf-8').split('\n').map((x) => +x).sort((a, b) => a - b);

const diff = {};

for (let i = 0; i < jolts.length - 1; i += 1) {
  if (diff[jolts[i + 1] - jolts[i]]) {
    diff[jolts[i + 1] - jolts[i]] += 1;
  } else {
    diff[jolts[i + 1] - jolts[i]] = 1;
  }
}

diff['1'] += 1;
diff['3'] += 1;
console.log(diff);
console.log(jolts);
console.log((diff['1']) * (diff['3']));
