import { getInputLines, parseInts, printPart } from "./util";

const lines = await getInputLines(7);
const possibleOperators = ["+", "*", "||"];

const calculateResult = (operands: number[], operators: string[]) =>
  operands.reduce((acc, operand, i) => {
    if (i === 0) return operand;
    switch (operators[i - 1]) {
      case "+":
        return acc + operand;
      case "*":
        return acc * operand;
      case "||":
        return parseInt(`${acc}${operand}`);
    }
  }, 0);

const findTotalCalibrationResult = (operatorCount: number) =>
  lines.reduce((acc, line) => {
    const [calibrationResult, ...operands] = parseInts(line.split(/[:\s]+/));
    const possibleOperatorPositionCount = operands.length - 1;

    for (let i = 0; i < operatorCount ** possibleOperatorPositionCount; i++) {
      const operators = Array.from(
        { length: possibleOperatorPositionCount },
        (_, index) =>
          possibleOperators[
            Math.floor(i / operatorCount ** index) % operatorCount
          ]
      );

      if (calculateResult(operands, operators) === calibrationResult) {
        return acc + calibrationResult;
      }
    }

    return acc;
  }, 0);

printPart(1, findTotalCalibrationResult(2));
printPart(2, findTotalCalibrationResult(3));
