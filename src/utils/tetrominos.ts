import EmptyBlock from '@/components/Tetrominos/EmptyBlock.vue';
import IBlock from '@/components/Tetrominos/IBlock.vue';
import JBlock from '@/components/Tetrominos/JBlock.vue';
import LBlock from '@/components/Tetrominos/LBlock.vue';
import OBlock from '@/components/Tetrominos/OBlock.vue';
import SBlock from '@/components/Tetrominos/SBlock.vue';
import TBlock from '@/components/Tetrominos/TBlock.vue';
import ZBlock from '@/components/Tetrominos/ZBlock.vue';

export const getBlockType = (type: number) => {
  switch (type) {
    case 1:
      return IBlock;
    case 2:
      return JBlock;
    case 3:
      return LBlock;
    case 4:
      return OBlock;
    case 5:
      return SBlock;
    case 6:
      return TBlock;
    case 7:
      return ZBlock;
    case 0:
    default:
      return EmptyBlock;
  }
};
