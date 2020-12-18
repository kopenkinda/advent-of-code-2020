const { readFileSync } = require('fs');

const data = readFileSync('./input.txt').toString().split('\n\n');

function verifyPassport(rawPassport) {
  const checks = {
    cid: false,
    count: 0,
    max: 8,
  };
  const passport = rawPassport
    .split('\n')
    .join(' ')
    .split(' ')
    .map((x) => x.split(':'))
    .reduce((acc, [field, value]) => {
      acc[field] = value;
      return acc;
    }, {});
  Object.keys(passport).forEach((key) => {
    switch (key) {
      case 'byr': {
        if (
          (passport[key].length === 4)
          && (+passport[key] >= 1920)
          && (passport[key] <= 2002)
        ) {
          checks.count += 1;
        }
        break;
      }
      case 'iyr': {
        if (
          (passport[key].length === 4)
          && (+passport[key] >= 2010)
          && (passport[key] <= 2020)
        ) {
          checks.count += 1;
        }
        break;
      }
      case 'eyr': {
        if (
          (passport[key].length === 4)
          && (+passport[key] >= 2020)
          && (passport[key] <= 2030)
        ) {
          checks.count += 1;
        }
        break;
      }
      case 'hgt': {
        const type = passport[key].slice(-2);
        const value = passport[key].slice(0, -2);
        if (type === 'cm') {
          if (+value >= 150 && +value <= 193) {
            checks.count += 1;
          }
        }
        if (type === 'in') {
          if (+value >= 59 && +value <= 76) {
            checks.count += 1;
          }
        }
        break;
      }
      case 'hcl': {
        if (passport[key].match(/^#([A-Fa-f0-9]{6})$/g)) {
          checks.count += 1;
        }
        break;
      }
      case 'ecl': {
        if (['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passport[key].toLowerCase())) {
          checks.count += 1;
        }
        break;
      }
      case 'pid': {
        if (passport[key].match(/^[0-9]{9}$/)) {
          checks.count += 1;
        }
        break;
      }
      case 'cid': {
        checks.cid = true;
        checks.count += 1;
        break;
      }
      default: {
        break;
      }
    }
  });
  if (
    (checks.max === checks.count)
    || (checks.max === checks.count + 1 && !checks.cid)
  ) {
    return true;
  }
  return false;
}

let verified = 0;

data.forEach((passport) => {
  if (verifyPassport(passport)) {
    verified += 1;
  }
});

console.log(verified);
