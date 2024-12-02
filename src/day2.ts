import { getInputLines, printPart } from "./util";

const lines = await getInputLines(2);

const safeReportCount = lines.reduce((acc, line) => {
  const numbers = line.split(/\s+/).map((num) => parseInt(num));

  if (
    (numbers.every((num, i) => (i === 0 ? true : num >= numbers[i - 1])) ||
      numbers.every((num, i) => (i === 0 ? true : num <= numbers[i - 1]))) &&
    numbers.every((num, i) =>
      i === 0
        ? true
        : Math.abs(num - numbers[i - 1]) <= 3 && num !== numbers[i - 1]
    )
  ) {
    return acc + 1;
  }

  return acc;
}, 0);

printPart(1, safeReportCount);
