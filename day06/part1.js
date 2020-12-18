const fs = require('fs');

const groups = fs.readFileSync('./input.txt').toString().split('\n\n');

function getGroupData(group) {
  const allAnswers = group.split('\n').join('');
  const answers = [...new Set(allAnswers.split(''))];
  return answers.length;
}

let summ = 0;

groups.forEach((group) => {
  summ += getGroupData(group);
});

console.log(summ);
