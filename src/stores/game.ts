import { getRandomBlock } from '@/data/tetrominos';
import { createMatrix, generateShadowBoard, rotateMatrix } from '@/utils/matrix';
import { defineStore } from 'pinia';

export const BOARD_LEFT_CONSTRAINT = 0;
export const BOARD_RIGHT_CONSTRAINT = 9;
export const BOARD_BOTTOM_CONSTRAINT = 17;

type State = {
  board: any;
  currentBlock?: any;
  nextBlock?: any;
  rotation: number;
  positionX: number;
  positionY: number;
  gameOver: boolean;
  score: number;
  level: number;
};

export const useGameStore = defineStore({
  id: 'game',
  state: (): State => ({
    board: createMatrix(18, 10),
    currentBlock: undefined,
    nextBlock: undefined,
    rotation: 0,
    positionX: 0,
    positionY: 0,
    gameOver: false,
    score: 0,
    level: 1,
  }),
  actions: {
    addToScore(lines: number) {
      this.score = this.score + lines;
    },
    levelUp() {
      this.level = this.level + 1;
    },
    setCurrentBlock(block: any) {
      this.currentBlock = block;
      this.rotation = 0;
      this.positionX = this.board[0].length / 2;
      this.positionY = 0;
    },
    setNextBlock(block: any) {
      this.nextBlock = block;
    },
    setGameOver(gameOver: boolean) {
      this.gameOver = gameOver;
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
    resetGame() {
      this.setCurrentBlock(getRandomBlock());
      this.gameOver = false;
      this.score = 0;
      this.level = 1;
      this.board = createMatrix(18, 10);
    },
  },
  getters: {
    currentSpeed(state) {
      return 1000 - (state.level - 1) * 10;
    },
    shadowBoard(state) {
      return generateShadowBoard(state.board, state.currentBlock, state.positionX, state.positionY);
    },
  },
});
