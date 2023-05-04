import {
  BOARD_BOTTOM_CONSTRAINT,
  BOARD_LEFT_CONSTRAINT,
  BOARD_RIGHT_CONSTRAINT,
} from '@/stores/game';
import { rotateMatrix } from './matrix';

export const checkBottomCollision = (
  board: number[][],
  currentBlock: number[][],
  positionX: number,
  positionY: number
) => {
  let collided = false;
  const collisionBlocks = [];

  for (let i = 0; i < currentBlock.length; i++) {
    for (let j = 0; j < currentBlock[0].length; j++) {
      if (currentBlock[i][j] !== 0) {
        if (i === currentBlock.length - 1) {
          collisionBlocks.push([i, j]);
        } else if (currentBlock[i + 1][j] == 0) {
          collisionBlocks.push([i, j]);
        }
      }
    }
  }

  collisionBlocks.forEach(([i, j]) => {
    const absoluteX = positionX + j;
    const absoluteY = positionY + i;
    if (absoluteY === BOARD_BOTTOM_CONSTRAINT) {
      collided = true;
    } else if (board[absoluteY + 1][absoluteX] != 0) {
      collided = true;
    }
  });

  return collided;
};

export const checkLeftCollision = (
  board: number[][],
  currentBlock: number[][],
  positionX: number,
  positionY: number
) => {
  let collided = false;
  const collisionBlocks = [];

  for (let i = 0; i < currentBlock.length; i++) {
    for (let j = 0; j < currentBlock[0].length; j++) {
      if (currentBlock[i][j] !== 0) {
        if (j === 0) {
          collisionBlocks.push([i, j]);
        } else if (currentBlock[i][j - 1] == 0) {
          collisionBlocks.push([i, j]);
        }
      }
    }
  }

  collisionBlocks.forEach(([i, j]) => {
    const absoluteX = positionX + j;
    const absoluteY = positionY + i;
    if (absoluteX === BOARD_LEFT_CONSTRAINT) {
      collided = true;
    } else if (board[absoluteY][absoluteX - 1] != 0) {
      collided = true;
    }
  });

  return collided;
};

export const checkRightCollision = (
  board: number[][],
  currentBlock: number[][],
  positionX: number,
  positionY: number
) => {
  let collided = false;
  const collisionBlocks = [];

  for (let i = 0; i < currentBlock.length; i++) {
    for (let j = 0; j < currentBlock[0].length; j++) {
      if (currentBlock[i][j] !== 0) {
        if (j === currentBlock[0].length - 1) {
          collisionBlocks.push([i, j]);
        } else if (currentBlock[i][j + 1] == 0) {
          collisionBlocks.push([i, j]);
        }
      }
    }
  }

  collisionBlocks.forEach(([i, j]) => {
    const absoluteX = positionX + j;
    const absoluteY = positionY + i;
    if (absoluteX === BOARD_RIGHT_CONSTRAINT) {
      collided = true;
    } else if (board[absoluteY][absoluteX + 1] != 0) {
      collided = true;
    }
  });

  return collided;
};

export const checkRotationClockwiseCollision = (
  board: number[][],
  currentBlock: number[][],
  positionX: number,
  positionY: number
) => {
  const rotatedBlock = rotateMatrix(currentBlock);

  if (positionX > BOARD_RIGHT_CONSTRAINT - rotatedBlock[0].length + 1) {
    positionX = BOARD_RIGHT_CONSTRAINT - rotatedBlock[0].length + 1;
  }
  if (positionY > BOARD_BOTTOM_CONSTRAINT - rotatedBlock.length + 1) {
    positionY = BOARD_BOTTOM_CONSTRAINT - rotatedBlock.length + 1;
  }

  let collided = false;
  const collisionBlocks = [];

  for (let i = 0; i < rotatedBlock.length; i++) {
    for (let j = 0; j < rotatedBlock[0].length; j++) {
      if (rotatedBlock[i][j] !== 0) {
        collisionBlocks.push([i, j]);
      }
    }
  }

  collisionBlocks.forEach(([i, j]) => {
    const absoluteX = positionX + j;
    const absoluteY = positionY + i;
    if (board[absoluteY][absoluteX] != 0) {
      collided = true;
    }
  });

  return collided;
};
