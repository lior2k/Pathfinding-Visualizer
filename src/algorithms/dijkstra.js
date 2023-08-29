function initDistances(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      matrix[i][j].distance = Infinity;
    }
  }
}

export function dijkstraAlgo(matrix, startRow, startCol, endRow, endCol) {
  initDistances(matrix);
  console.log(matrix);
}
