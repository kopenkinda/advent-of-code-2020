const fs = require('fs');
const { Range } = require('./Range');
const { RangeGroup } = require('./RangeGroup');

const groups = fs.readFileSync('./input.txt', 'utf-8').split('\n\n');

const ranges = groups[0].split('\n').map((raw) => {
  const [name, other] = raw.split(': ');
  const innerRanges = other.split(' or ').map((x) => new Range(...x.split('-').map((y) => +y)));
  return { name, ranges: new RangeGroup(innerRanges) };
});

const myTicket = groups[1].split('\n')[1].split(',').map((x) => +x);

const otherTickets = groups[2].split('\n').slice(1).map((y) => y.split(',').map((x) => +x));

const allOtherTicketsValue = otherTickets.flat();
const allRanges = ranges.map((x) => x.ranges).flat();

const invalidValues = [];

allOtherTicketsValue.forEach((ticketValue) => {
  let foundOne = false;
  allRanges.forEach((range) => {
    if (range.isWithin(ticketValue)) {
      foundOne = true;
    }
  });
  if (!foundOne) {
    invalidValues.push(ticketValue);
  }
});

const summOfAllInvalidValues = [...invalidValues].reduce((a, v) => a + v, 0);

console.log(summOfAllInvalidValues);
