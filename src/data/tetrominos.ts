export const IBlock = [[1], [1], [1], [1]];

export const JBlock = [
  [2, 0, 0],
  [2, 2, 2],
];

export const LBlock = [
  [0, 0, 3],
  [3, 3, 3],
];

export const OBlock = [
  [4, 4],
  [4, 4],
];

export const SBlock = [
  [0, 5, 5],
  [5, 5, 0],
];

export const TBlock = [
  [0, 6, 0],
  [6, 6, 6],
];

export const ZBlock = [
  [7, 7, 0],
  [0, 7, 7],
];

export const getRandomBlock = () => {
  const blocks = [IBlock, JBlock, LBlock, OBlock, SBlock, TBlock, ZBlock];
  const randomIndex = Math.floor(Math.random() * (blocks.length - 1));
  return blocks[randomIndex];
};
