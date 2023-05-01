import { createMatrix, rotateMatrix } from '@/utils/matrix';
import { defineStore } from 'pinia';

const BOARD_LEFT_CONSTRAINT = 0;
const BOARD_RIGHT_CONSTRAINT = 9;
const BOARD_BOTTOM_CONSTRAINT = 17;

type State = {
  board: any;
  currentBlock?: any;
  rotation: number;
  positionX: number;
  positionY: number;
};

export const useGameStore = defineStore({
  id: 'game',
  state: (): State => ({
    board: createMatrix(18, 10),
    currentBlock: undefined,
    rotation: 0,
    positionX: 0,
    positionY: 0,
  }),
  actions: {
    setCurrentBlock(block: any) {
      this.currentBlock = block;
      this.rotation = 0;
      this.positionX = this.board[0].length / 2;
      this.positionY = 0;
    },
    copyShadowToBoard(shadow: any) {
      this.board = shadow;
    },
    compensateLeftMovement() {
      if (this.positionX < BOARD_LEFT_CONSTRAINT) {
        this.positionX = BOARD_LEFT_CONSTRAINT;
      }
    },
    compensateRightMovement() {
      if (this.positionX > BOARD_RIGHT_CONSTRAINT - this.currentBlock[0].length + 1) {
        this.positionX = BOARD_RIGHT_CONSTRAINT - this.currentBlock[0].length + 1;
      }
    },
    compensateDownMovement() {
      if (this.positionY > BOARD_BOTTOM_CONSTRAINT - this.currentBlock.length + 1) {
        this.positionY = BOARD_BOTTOM_CONSTRAINT - this.currentBlock.length + 1;
      }
    },
    rotateClockwise() {
      if (!this.currentBlock) return;
      this.rotation += 90;
      if (this.rotation === 360) {
        this.rotation = 0;
      }

      this.currentBlock = rotateMatrix(this.currentBlock);
      useGameStore().compensateRightMovement();
      useGameStore().compensateDownMovement();
    },
    moveLeft() {
      if (!this.currentBlock) return;
      this.positionX--;
      useGameStore().compensateLeftMovement();
    },
    moveRight() {
      if (!this.currentBlock) return;
      this.positionX++;
      useGameStore().compensateRightMovement();
    },
    moveDown() {
      if (!this.currentBlock) return;
      this.positionY++;
      useGameStore().compensateDownMovement();
    },
  },
});
