const fs = require('fs');

const operations = fs.readFileSync('./input.txt').toString().split('\n');
// const app = {
//   acc: 0,
//   index: 0,
//   executed: [],
// };
// function getNextOp() {
//   if (operations[app.index] == null) return;
//   if (app.executed.includes(app.index)) {
//     return;
//   }

//   let [op, value] = operations[app.index].split(' ');
//   if (app.executed.includes(app.index)) {
//     op = op === 'jmp' ? 'nop' : 'jmp';
//   }

//   app.executed.push(app.index);
//   if (op === 'acc') {
//     app.acc += +value;
//     app.index += 1;
//   } else if (op === 'jmp') {
//     app.index += +value;
//   } else if (op === 'nop') {
//     app.index += 1;
//   }
//   getNextOp();
// }

// getNextOp();
// console.log(app);

function run(instructions, changeIndex) {
  const executed = [];
  let acc = 0;
  let index = 0;
  while (!executed.includes(index) && index < instructions.length - 1) {
    const [_op, value] = instructions[index].split(' ');
    executed.push(index);
    let op = _op;
    if (index === changeIndex && ['nop', 'jmp'].includes(op)) {
      op = _op === 'jmp' ? 'nop' : 'jmp';
    }
    if (op === 'acc') {
      acc += +value;
      index += 1;
    } else if (op === 'jmp') {
      index += +value;
    } else if (op === 'nop') {
      index += 1;
    }
  }
  return (index === instructions.length - 1) ? acc : null;
}

const executions = [];

for (let i = 0; i < operations.length; i += 1) {
  executions.push(run(operations, i));
}

console.log(executions.filter((x) => x != null)[0]);
