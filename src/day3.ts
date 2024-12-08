import { getInputLines, printPart } from "./util";

const memory = await getInputLines(3);

const muls = memory.flatMap((line) =>
  Array.from(line.matchAll(/mul\((\d+,\d+)\)/g), (m) => m[1]).map((pair) => {
    const [a, b] = pair.split(",");
    return parseInt(a) * parseInt(b);
  })
);

printPart(
  1,
  muls.reduce((acc, val) => acc + val, 0)
);

let enabled = true;
printPart(
  2,
  memory
    .flatMap((line) =>
      Array.from(
        line.matchAll(/(mul\((\d+,\d+)\))|(don't\(\))|(do\(\))/g),
        (m) => m[2] || m[0]
      )
    )
    .map((op) => {
      switch (op) {
        case "do()":
          enabled = true;
          break;
        case "don't()":
          enabled = false;
          break;
        default:
          if (enabled) {
            const [a, b] = op.split(",");
            return parseInt(a) * parseInt(b);
          }
      }
    })
    .reduce((acc, val) => acc + (val || 0), 0)
);
