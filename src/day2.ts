import { getInputLines, printPart } from "./util";

const areLevelsSafe = (numbers: number[]) =>
  (numbers.every((num, i) => (i === 0 ? true : num >= numbers[i - 1])) ||
    numbers.every((num, i) => (i === 0 ? true : num <= numbers[i - 1]))) &&
  numbers.every((num, i) =>
    i === 0
      ? true
      : Math.abs(num - numbers[i - 1]) <= 3 && num !== numbers[i - 1]
  );

const [partOne, partTwo] = await getInputLines(2).then((lines) =>
  lines
    .map((line) => line.split(/\s+/).map((num) => parseInt(num)))
    .reduce(
      ([partOne, partTwo], numbers) =>
        areLevelsSafe(numbers)
          ? [partOne + 1, partTwo + 1]
          : numbers.some((num, i) => areLevelsSafe(numbers.toSpliced(i, 1)))
          ? [partOne, partTwo + 1]
          : [partOne, partTwo],
      [0, 0]
    )
);

printPart(1, partOne);
printPart(2, partTwo);
