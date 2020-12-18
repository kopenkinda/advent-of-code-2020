const fs = require('fs');

const groups = fs.readFileSync('./input.txt').toString().split('\n\n');

function getGroupData(group) {
  const people = group.split('\n');
  const possibleAnswers = new Set(people[0].split(''));
  for (let i = 1; i < people.length; i += 1) {
    const humanAnswers = new Set(people[i].split(''));
    [...possibleAnswers].forEach((answer) => {
      if (!humanAnswers.has(answer)) {
        possibleAnswers.delete(answer);
      }
    });
  }
  return [...possibleAnswers].length;
}

let summ = 0;

groups.forEach((group) => {
  summ += getGroupData(group);
});

console.log(summ);
