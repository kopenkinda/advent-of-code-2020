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

let max = -1;

rows.forEach((row) => {
  const sid = getSeatID(row);
  if (sid > max) {
    max = sid;
  }
});

console.log(max);
