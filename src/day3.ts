import { getInputLines, printPart } from "./util";

const memory = await getInputLines(3);

const muls = memory.flatMap((line) => {
  return Array.from(line.matchAll(/mul\((\d+,\d+)\)/g), (m) => m[1]).map(
    (pair) => {
      const [a, b] = pair.split(",");
      return parseInt(a) * parseInt(b);
    }
  );
});

printPart(1, muls.reduce((acc, val) => acc + val, 0));
