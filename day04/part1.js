const { readFileSync } = require('fs');

const data = readFileSync('./input.txt').toString().split('\n\n');

function verifyPassport(rawPassport) {
  const neededFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid'];
  let presentFields = 0;
  let hasCID = false;
  const passport = rawPassport.split('\n').join(' ').split(' ').map((x) => x.split(':'));
  passport.forEach(([field]) => {
    if (neededFields.includes(field)) {
      if (field === 'cid') {
        hasCID = true;
      }
      presentFields += 1;
    }
  });
  if (
    (presentFields === neededFields.length)
    || (presentFields === neededFields.length - 1 && !hasCID)
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
