import { getInputLines, printPart } from "./util";

const lines = await getInputLines(6);
// const lines = `....#.....
// .........#
// ..........
// ..#.......
// .......#..
// ..........
// .#..^.....
// ........#.
// #.........
// ......#...`.split("\n");
const labHeight = lines.length;
const labWidth = lines[0].length;

console.log(labHeight, labWidth);

const startPos = { x: 0, y: 0 };
const guardCoords = {
  x: 0,
  y: 0,
  direction: 0, // 0 = up, 1 = right, 2 = down, 3 = left
};
for (let y = 0; y < lines.length; y++) {
  for (let x = 0; x < labWidth; x++) {
    if (lines[y][x] === "^") {
      guardCoords.y = y;
      guardCoords.x = x;
      startPos.x = x;
      startPos.y = y;
    }
  }
}

const peek = (addedObstacleCoords?: { x: number; y: number }) => {
  const { x, y, direction } = guardCoords;
  let nextPos = { x, y };
  switch (direction) {
    case 0:
      nextPos.y--;
      break;
    case 1:
      nextPos.x++;
      break;
    case 2:
      nextPos.y++;
      break;
    case 3:
      nextPos.x--;
      break;
  }

  return addedObstacleCoords &&
    addedObstacleCoords.x === nextPos.x &&
    addedObstacleCoords.y === nextPos.y
    ? "#"
    : lines[nextPos.y]?.[nextPos.x];
};

const walk = (addedObstacleCoords?: { x: number; y: number }) => {
  if (peek(addedObstacleCoords) === "#") {
    // Turn right
    guardCoords.direction = (guardCoords.direction + 1) % 4;
  }

  switch (guardCoords.direction) {
    case 0:
      guardCoords.y--;
      break;
    case 1:
      guardCoords.x++;
      break;
    case 2:
      guardCoords.y++;
      break;
    case 3:
      guardCoords.x--;
      break;
  }
};

const isInside = () =>
  guardCoords.y >= 0 &&
  guardCoords.y < labHeight &&
  guardCoords.x >= 0 &&
  guardCoords.x < labWidth;

const visited = new Set<string>();
while (isInside()) {
  visited.add(`${guardCoords.x},${guardCoords.y}`);
  walk();
}

printPart(1, visited.size);

const isLooping = (steps: Array<string>) => {
  if (steps.length <= 3) {
    return false;
  }

  const lastSteps = steps.slice(-2);

  for (let i = 0; i < steps.length - 3; i++) {
    if (steps[i] === lastSteps[0] && steps[i + 1] === lastSteps[1]) {
      return true;
    }
  }
};

let possibleObstaclePositionCount = 0;
for (let y = 0; y < labHeight; y++) {
  for (let x = 0; x < labWidth; x++) {
    if (
      lines[y][x] === "#" || // Already an obstacle
      lines[y][x] === "^" || // Guard starting position
      !visited.has(`${x},${y}`) // Not visited
    ) {
      continue;
    }
    guardCoords.x = startPos.x;
    guardCoords.y = startPos.y;
    guardCoords.direction = 0;

    const loop = new Array<string>();
    let stepCount = 0;
    while (isInside()) {
      if (isLooping(loop)) {
        possibleObstaclePositionCount++;
        console.log(
          `Looping with obstacle on ${x},${y} after ${stepCount} steps`
        );
        break;
      }

      loop.push(`${guardCoords.x},${guardCoords.y}`);
      walk({ x, y });
      stepCount++;
    }
  }
}

// Somehow this doesn't work...
printPart(2, possibleObstaclePositionCount);
