/*
--- Part Two ---
The Elves in accounting are thankful for your help;
one of them even offers you a starfish coin they had left over from a past vacation.
They offer you a second one if you can find three numbers in your
expense report that meet the same criteria.

Using the above example again, the three entries that sum to 2020 are 979, 366, and 675.
Multiplying them together produces the answer, 241861950.

In your expense report, what is the product of the three entries that sum to 2020?
*/

const fs = require('fs');

const data = fs.readFileSync('./day01_input.txt').toString().split('\n').map((x) => parseInt(x, 10));

const first = {
  number: -1,
  index: -1,
};

const second = {
  number: -1,
  index: -1,
};

const third = {
  number: -1,
  index: -1,
};

let shouldBreak = false;

for (let index1 = 0; index1 < data.length; index1 += 1) {
  first.number = data[index1];
  first.index = index1;
  for (let index2 = index1 + 1; index2 < data.length; index2 += 1) {
    if (shouldBreak) break;
    second.number = data[index2];
    second.index = index2;
    for (let index3 = index2 + 1; index3 < data.length; index3 += 1) {
      if (shouldBreak) break;
      third.number = data[index3];
      third.index = index2;
      if (first.number + second.number + third.number === 2020) {
        shouldBreak = true;
        break;
      }
    }
  }
  if (shouldBreak) break;
}

console.log(
  { first, second, third },
  first.number + second.number + third.number,
  first.number * second.number * third.number,
);
