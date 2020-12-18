const fs = require('fs');

const operations = fs.readFileSync('./input.txt').toString().split('\n');
const app = {
  acc: 0,
  index: 0,
  executed: [],
};
function getNextOp() {
  if (app.executed.includes(app.index)) return;
  if (operations[app.index] == null) return;

  const [op, value] = operations[app.index].split(' ');
  app.executed.push(app.index);
  if (op === 'acc') {
    app.acc += +value;
    app.index += 1;
  } else if (op === 'jmp') {
    app.index += +value;
  } else if (op === 'nop') {
    app.index += 1;
  }
  getNextOp();
}

getNextOp();
console.log(app);
