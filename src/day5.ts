import { getInputGroups, parseInts, printPart } from "./util";

const [rules, updates] = (await getInputGroups(5).then(
  ([rawRules, updates]) => [
    rawRules.split("\n").map((rule) => rule.trim()),
    updates.split("\n").map((update) => parseInts(update.trim().split(","))),
  ]
)) as [string[], number[][]];

let mistakes = [];
const isOrderCorrect = (update: number[]) => {
  mistakes = [];
  return update.every((iNum, i) =>
    update.every((jNum, j) => {
      if (j === i) return true;

      // if (j < i && rules.includes(`${iNum}|${jNum}`)) {
      //   mistakes.push([i, j]);
      //   return false;
      // }
      // if (j > i && rules.includes(`${jNum}|${iNum}`)) {
      //   mistakes.push([j, i]);
      //   return false;
      // }

        return !(
          (j < i && rules.includes(`${iNum}|${jNum}`)) ||
          (j > i && rules.includes(`${jNum}|${iNum}`))
        );
    })
  );
};

let correctMiddlePageSum = 0;
let incorrectReorderedMiddlePageSum = 0;
updates.forEach((update) => {
  if (isOrderCorrect(update)) {
    correctMiddlePageSum += update[Math.floor(update.length / 2)];
  } else {
    // Order is incorrect
    // Find the correct order
  }
});

printPart(1, correctMiddlePageSum);
printPart(2, incorrectReorderedMiddlePageSum);
