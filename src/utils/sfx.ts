import MenuWav from '@/assets/sfx/menu.wav';
import MoveWav from '@/assets/sfx/move.wav';
import RotateWav from '@/assets/sfx/rotate.wav';
import LandWav from '@/assets/sfx/land.wav';
import LineClearWav from '@/assets/sfx/line_clear.wav';
import GameOverWav from '@/assets/sfx/game_over.wav';

export const playMenuSound = () => {
  const sfx = new Audio(MenuWav);
  sfx.play();
};

export const playMoveSound = () => {
  const sfx = new Audio(MoveWav);
  sfx.play();
};

export const playRotateSound = () => {
  const sfx = new Audio(RotateWav);
  sfx.play();
};

export const playLandSound = () => {
  const sfx = new Audio(LandWav);
  sfx.play();
};

export const playLineClearSound = () => {
  const sfx = new Audio(LineClearWav);
  sfx.play();
};

export const playGameOverSound = () => {
  const sfx = new Audio(GameOverWav);
  sfx.play();
};
