import { getInputLines, printPart } from "./util";

const lines = await getInputLines(1),
  leftNums: number[] = [],
  rightNums: number[] = [];

lines.forEach((line) => {
  const [left, right] = line.split(/\s+/).map((num) => parseInt(num));
  leftNums.push(left);
  rightNums.push(right);
});
leftNums.sort((a, b) => a - b);
rightNums.sort((a, b) => a - b);

printPart(
  1,
  leftNums.reduce((acc, num, i) => acc + Math.abs(num - rightNums[i]), 0)
);

printPart(
  2,
  leftNums.reduce((acc, num, i) => {
    const similarity = rightNums.filter((rightNum) => rightNum === num).length;
    return acc + similarity * num;
  }, 0)
);
