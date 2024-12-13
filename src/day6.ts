import { getInputLines, printPart } from "./util";

const lines = await getInputLines(6);
const labHeight = lines.length;
const labWidth = lines[0].length;

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

const peek = () => {
  const { x, y, direction } = guardCoords;
  switch (direction) {
    case 0:
      return lines[y - 1]?.[x];
    case 1:
      return lines[y][x + 1];
    case 2:
      return lines[y + 1]?.[x];
    case 3:
      return lines[y][x - 1];
  }
};

const walk = () => {
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

const visited = new Set<string>();
while (
  guardCoords.y >= 0 &&
  guardCoords.y < labHeight &&
  guardCoords.x >= 0 &&
  guardCoords.x < labWidth
) {
  const key = `${guardCoords.x},${guardCoords.y}`;
  visited.add(key);

  if (peek() === "#") {
    // Turn right
    guardCoords.direction = (guardCoords.direction + 1) % 4;
  } else {
    walk();
  }
}

printPart(1, visited.size);
