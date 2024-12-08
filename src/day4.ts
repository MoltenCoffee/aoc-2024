import { getInputLines, printPart } from "./util";

const matrix = await getInputLines(4);

const getCoords = (x: number, y: number) => {
  return [
    [
      [x + 1, y],
      [x + 2, y],
      [x + 3, y],
    ],
    [
      [x - 1, y],
      [x - 2, y],
      [x - 3, y],
    ],
    [
      [x, y + 1],
      [x, y + 2],
      [x, y + 3],
    ],
    [
      [x, y - 1],
      [x, y - 2],
      [x, y - 3],
    ],
    [
      [x + 1, y + 1],
      [x + 2, y + 2],
      [x + 3, y + 3],
    ],
    [
      [x - 1, y - 1],
      [x - 2, y - 2],
      [x - 3, y - 3],
    ],
    [
      [x + 1, y - 1],
      [x + 2, y - 2],
      [x + 3, y - 3],
    ],
    [
      [x - 1, y + 1],
      [x - 2, y + 2],
      [x - 3, y + 3],
    ],
  ];
};

const countXmas = (x: number, y: number) => {
  let count = 0;

  getCoords(x, y).forEach((direction) => {
    if (direction.every(([x, y], i) => matrix[y]?.[x] === "MAS"[i])) {
      count++;
    }
  });

  return count;
};

let total = 0;
for (let y = 0; y < matrix.length; y++) {
  for (let x = 0; x < matrix[y].length; x++) {
    if (matrix[y][x] === "X") {
      total += countXmas(x, y);
    }
  }
}

printPart(1, total);
