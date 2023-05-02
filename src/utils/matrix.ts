export const createMatrix = (height: number, width: number, initValue = 0) =>
  Array.apply(null, Array(height)).map(() => Array.apply(null, Array(width)).map(() => initValue));

export const rotateMatrix = (matrix: number[][]) => {
  const rotatedMatrix = createMatrix(matrix[0].length, matrix.length);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      rotatedMatrix[j][matrix.length - i - 1] = matrix[i][j];
    }
  }

  return rotatedMatrix;
};