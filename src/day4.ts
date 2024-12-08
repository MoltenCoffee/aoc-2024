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

const getXLetters = (x: number, y: number) =>
  [
    matrix[y - 1]?.[x - 1],
    matrix[y + 1]?.[x - 1],
    matrix[y - 1]?.[x + 1],
    matrix[y + 1]?.[x + 1],
  ].join("");
const orders = ["MMSS", "MSMS", "SSMM", "SMSM"];

let total = 0;
let total2 = 0;
for (let y = 0; y < matrix.length; y++) {
  for (let x = 0; x < matrix[y].length; x++) {
    if (matrix[y][x] === "X") {
      total += countXmas(x, y);
    } else if (matrix[y][x] === "A" && orders.includes(getXLetters(x, y))) {
      total2++;
    }
  }
}

printPart(1, total);
printPart(2, total2);
