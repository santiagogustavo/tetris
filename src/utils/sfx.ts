import MoveWav from '@/assets/sfx/move.wav';
import RotateWav from '@/assets/sfx/rotate.wav';
import LandWav from '@/assets/sfx/land.wav';

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
