import { openInput, printPart, parseInts } from "./util";

const diskMap = await openInput(9).then((line) => parseInts(Array.from(line)));
// const diskMap = parseInts(Array.from("2333133121414131402"));

let furthestAvailableFile = diskMap.length - 1;
const getFurthestFileBlockIds = (
  availableBlocks: number,
  fileBlockIds: number[] = []
) => {
  while (availableBlocks > 0) {
    if (diskMap[furthestAvailableFile] === 0) furthestAvailableFile -= 2;

    const fileBlockId = Math.ceil(furthestAvailableFile / 2);

    if (diskMap[furthestAvailableFile] >= availableBlocks) {
      diskMap[furthestAvailableFile] -= availableBlocks;
      for (let i = 0; i < availableBlocks; i++) {
        fileBlockIds.push(fileBlockId);
      }
      return fileBlockIds;
    }

    const fileBlocksAvailable = diskMap[furthestAvailableFile];
    diskMap[furthestAvailableFile] = 0;

    for (let i = 0; i < fileBlocksAvailable; i++) {
      fileBlockIds.push(fileBlockId);
    }

    availableBlocks -= fileBlocksAvailable;
  }
  return fileBlockIds;
};

let diskIndex = 0;
let checkSum = 0;
for (let i = 0; i < diskMap.length; i++) {
  const blockSize = diskMap[i];
  const blockId = i / 2;

  if (isNaN(blockSize)) continue;
  if (i > furthestAvailableFile) break;

  if (i % 2 === 0) {
    // block represents the size of the file
    for (let j = 0; j < blockSize; j++) {
      checkSum += blockId * diskIndex++;
    }
  } else if (blockSize > 0) {
    // block represents the size of the empty space
    let blockIds = getFurthestFileBlockIds(blockSize);
    for (let j = 0; j < blockSize; j++) {
      checkSum += blockIds[j] * diskIndex++;
    }
  }
}
printPart(1, checkSum);
