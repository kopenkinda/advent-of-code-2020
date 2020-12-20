const fs = require('fs');

const lines = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const timestamp = +lines[0];
const schedules = lines[1].split(',').filter((x) => x !== 'x').map((x) => +x);

const l = schedules.reduce((acc, v, i) => {
  const wait = v - (timestamp % v);
  if (wait < acc[0]) {
    return [wait, i];
  }
  return acc;
}, [Number.MAX_SAFE_INTEGER, -1]);

console.log(schedules[l[1]] * l[0]);
