import { BOARD_BOTTOM_CONSTRAINT } from '@/stores/game';

export const checkCollision = (
  board: number[][],
  currentBlock: number[][],
  positionX: number,
  positionY: number
) => {
  let collided = false;

  const i = currentBlock.length - 1;
  for (let j = 0; j < currentBlock[0].length; j++) {
    const absoluteX = positionX + j;
    const absoluteY = positionY + i;

    if (currentBlock[i][j] != 0) {
      if (absoluteY === BOARD_BOTTOM_CONSTRAINT) {
        collided = true;
      } else if (board[absoluteY + 1][absoluteX] != 0) {
        collided = true;
      }
    } else if (board[absoluteY][absoluteX] != 0) {
      collided = true;
    }
  }

  return collided;
};
