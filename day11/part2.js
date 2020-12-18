const fs = require('fs');

const startingMap = fs.readFileSync('./input.txt', 'utf-8');

function flattenMap(m) {
  return m.map((x) => x.join('')).join('\n');
}

function parseMap(rm) {
  return rm.split('\n').map((x) => x.split(''));
}

function diagonals(px, py, map) {
  const height = map.length;
  const width = map[0].length;
  let adj = 0;
  let [a, b, c, d] = [false, false, false, false];
  for (let x = px - 1, y = py - 1; (x >= 0 || y >= 0) && !a; x -= 1, y -= 1) {
    if (map[y]) {
      if (map[y][x] === '#') {
        adj += 1;
        a = true;
        break;
      }
      if (map[y][x] === 'L') {
        a = true;
        break;
      }
    }
  }
  for (let x = px - 1, y = py + 1; (x >= 0 || y < height) && !b; x -= 1, y += 1) {
    if (map[y]) {
      if (map[y][x] === '#') {
        adj += 1;
        b = true;
        break;
      }
      if (map[y][x] === 'L') {
        b = true;
        break;
      }
    }
  }
  for (let x = px + 1, y = py - 1; (x < width || y >= 0) && !c; x += 1, y -= 1) {
    if (map[y]) {
      if (map[y][x] === '#') {
        adj += 1;
        c = true;
        break;
      }
      if (map[y][x] === 'L') {
        c = true;
        break;
      }
    }
  }
  for (let y = py + 1, x = px + 1; (y < height || x < width) && !d; y += 1, x += 1) {
    if (map[y]) {
      if (map[y][x] === '#') {
        adj += 1;
        d = true;
        break;
      }
      if (map[y][x] === 'L') {
        d = true;
        break;
      }
    }
  }
  return adj;
}

function axis(px, py, map) {
  const height = map.length;
  const width = map[0].length;
  let adj = 0;
  for (let x = px - 1; x >= 0; x -= 1) {
    if (map[py]) {
      if (map[py][x] === '#') {
        adj += 1;
        break;
      }
      if (map[py][x] === 'L') {
        break;
      }
    }
  }
  for (let x = px + 1; x < width; x += 1) {
    if (map[py]) {
      if (map[py][x] === '#') {
        adj += 1;
        break;
      }
      if (map[py][x] === 'L') {
        break;
      }
    }
  }
  for (let y = py - 1; y >= 0; y -= 1) {
    if (map[y]) {
      if (map[y][px] === '#') {
        adj += 1;
        break;
      }
      if (map[y][px] === 'L') {
        break;
      }
    }
  }
  for (let y = py + 1; y < height; y += 1) {
    if (map[y]) {
      if (map[y][px] === '#') {
        adj += 1;
        break;
      }
      if (map[y][px] === 'L') {
        break;
      }
    }
  }
  return adj;
}

function run(map) {
  const newMap = parseMap(flattenMap(map));
  for (let y = 0; y < map.length; y += 1) {
    for (let x = 0; x < map[y].length; x += 1) {
      if (map[y][x] === '.') continue;
      let adjacent = 0;
      const a = axis(x, y, map);
      const d = diagonals(x, y, map);
      adjacent += a;
      adjacent += d;

      if (adjacent === 0 && map[y][x] === 'L') {
        newMap[y][x] = '#';
      } else if (adjacent >= 5 && map[y][x] === '#') {
        newMap[y][x] = 'L';
      }
    }
  }
  return newMap;
}

const m = 100;

function simulate(map, max = m) {
  if (max < 1) return map;
  console.log('Run №', m - max);
  const flat = flattenMap(map);
  const next = run([...map]);
  const nextFlattened = flattenMap(next);
  if (flat === nextFlattened) return next;
  return simulate(next, max - 1);
}

const settledMap = simulate(parseMap(startingMap));
console.log(flattenMap(settledMap).split('').filter((x) => x === '#').length);

// console.log(axis(3, 3, parseMap(startingMap)));
// console.log(diagonals(3, 3, parseMap(startingMap)));
