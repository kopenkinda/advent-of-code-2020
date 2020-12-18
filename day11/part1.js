const fs = require('fs');

const startingMap = fs.readFileSync('./input.txt', 'utf-8');

function flattenMap(m) {
  return m.map((x) => x.join('')).join('\n');
}

function parseMap(rm) {
  return rm.split('\n').map((x) => x.split(''));
}

function run(map) {
  const newMap = parseMap(flattenMap(map));
  for (let y = 0; y < map.length; y += 1) {
    for (let x = 0; x < map[y].length; x += 1) {
      if (map[y][x] === '.') continue;
      let adjacent = 0;
      if (map[y + 1] && map[y + 1][x - 1] && map[y + 1][x - 1] === '#') adjacent += 1;
      if (map[y + 1] && map[y + 1][x] && map[y + 1][x] === '#') adjacent += 1;
      if (map[y + 1] && map[y + 1][x + 1] && map[y + 1][x + 1] === '#') adjacent += 1;
      if (map[y - 1] && map[y - 1][x - 1] && map[y - 1][x - 1] === '#') adjacent += 1;
      if (map[y - 1] && map[y - 1][x] && map[y - 1][x] === '#') adjacent += 1;
      if (map[y - 1] && map[y - 1][x + 1] && map[y - 1][x + 1] === '#') adjacent += 1;
      if (map[y] && map[y][x + 1] && map[y][x + 1] === '#') adjacent += 1;
      if (map[y] && map[y][x - 1] && map[y][x - 1] === '#') adjacent += 1;
      if (adjacent === 0 && map[y][x] === 'L') {
        newMap[y][x] = '#';
      } else if (adjacent >= 4 && map[y][x] === '#') {
        newMap[y][x] = 'L';
      }
    }
  }
  return newMap;
}

function simulate(map) {
  const flat = flattenMap(map);
  const next = run([...map]);
  const nextFlattened = flattenMap(next);
  if (flat === nextFlattened) return next;
  return simulate(next);
}

const settledMap = simulate(parseMap(startingMap));
console.log(flattenMap(settledMap).split('').filter((x) => x === '#').length);
