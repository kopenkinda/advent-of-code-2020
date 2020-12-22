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

const invalidValues = new Set();

otherTickets.forEach((ticket, i) => {
  ticket.forEach((ticketValue) => {
    let foundOne = false;
    allRanges.forEach((range) => {
      if (range.isWithin(ticketValue)) {
        foundOne = true;
      }
    });
    if (!foundOne) {
      invalidValues.add(i);
    }
  });
});

const validTickets = otherTickets.filter((_, i) => !invalidValues.has(i));
const rangesIndexes = new Map();
ranges.forEach((range) => rangesIndexes.set(range.name, new Set([...Array(ranges.length).keys()])));

validTickets.forEach((ticket) => {
  ranges.forEach(({ name, ranges: rangeGroup }) => {
    ticket.forEach((key, i) => {
      if (!rangeGroup.isWithin(key)) {
        const v = rangesIndexes.get(name);
        v.delete(i);
      }
    });
  });
});

const sortedRangesIndexes = [...rangesIndexes].sort((a, b) => a[1].size - b[1].size);

const usedRangesIndexes = [];

const finalRangesIndexes = sortedRangesIndexes.reduce((acc, v) => {
  const index = [...v[1]].filter((x) => !usedRangesIndexes.includes(x));
  acc[v[0]] = index[0];
  usedRangesIndexes.push(index[0]);
  return acc;
}, {});

const departureIndexes = Object.keys(finalRangesIndexes)
  .filter((name) => name.startsWith('departure')).map((x) => finalRangesIndexes[x]);

const product = departureIndexes.reduce((acc, index) => acc * myTicket[index], 1);

console.log(product);
