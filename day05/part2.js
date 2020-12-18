const fs = require('fs');

const rows = fs.readFileSync('./input.txt').toString().split('\n');

function getSeatID(rawRow) {
  const rowMoves = rawRow.slice(0, 7);
  const seatMoves = rawRow.slice(7);
  let x = 0;
  for (let i = 0; i < rowMoves.length; i += 1) {
    if (rowMoves[i] === 'B') {
      x += 2 ** (rowMoves.length - i - 1);
    }
  }

  let y = 0;
  for (let i = 0; i < seatMoves.length; i += 1) {
    if (seatMoves[i] === 'R') {
      y += 2 ** (seatMoves.length - i - 1);
    }
  }
  return x * 8 + y;
}

let ids = [];

rows.forEach((row) => {
  const sid = getSeatID(row);
  ids.push(sid);
});

ids = ids.sort((a, b) => a - b);

let i = 0;
while (ids[i] + 1 === ids[i + 1]) {
  i += 1;
}

console.log(ids[i] + 1);
