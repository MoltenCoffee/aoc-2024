import { readFile } from "node:fs/promises";

export const getPath = (day: number): string => `input/day${day}.txt`;

export const openInput = async (
  day: number,
  trim: Boolean = true
): Promise<String> => {
  const data = await readFile(getPath(day), "utf-8");
  return trim ? data.trim() : data;
};

export const getInputLines = async (day: number): Promise<Array<string>> =>
  (await openInput(day)).split("\n").map((line) => line.trim());

export const getInputGroups = async (day: number): Promise<Array<string>> =>
  (await openInput(day)).split("\n\n").map((line) => line.trim());

export const printPart = (part: number, result: number) => {
  console.log(`Part ${part}: ${result}`);
};

export const parseInts = (strings: Array<string>): Array<number> =>
  strings.map((num) => parseInt(num));
