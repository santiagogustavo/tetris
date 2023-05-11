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

export const generateShadowBoard = (
  board: number[][],
  currentBlock: number[][],
  positionX: number,
  positionY: number
) => {
  if (!currentBlock) {
    return board;
  }

  const shadow = JSON.parse(JSON.stringify(board));

  currentBlock?.forEach((row: any, i: number) => {
    row.forEach((col: number, j: number) => {
      const x = positionY + i;
      const y = positionX + j;
      if (col != 0) {
        shadow[x][y] = col;
      }
    });
  });

  return shadow;
};

export const detectLines = (matrix: number[][]) => {
  let lines: number[] = [];

  matrix.forEach((line: number[], index: number) => {
    let isLineFull = true;

    line.forEach((value: number) => {
      if (value === 0) {
        isLineFull = false;
      }
    });

    if (isLineFull) {
      lines = [...lines, index];
    }
  });

  return lines;
};

export const blowLines = (matrix: number[][], lines: number[]) => {
  const emptyLine = Array.apply(null, Array(matrix[0].length)).map(() => 0);
  const descendingLines = lines.sort().reverse();
  let blownMatrix = JSON.parse(JSON.stringify(matrix));

  descendingLines.forEach((line: number) => {
    blownMatrix.splice(line, 1);
  });

  descendingLines.forEach(() => {
    blownMatrix = [emptyLine, ...blownMatrix];
  });

  return blownMatrix;
};
