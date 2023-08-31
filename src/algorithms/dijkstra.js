const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function resetProps(matrix) {
  // for (let i = 0; i < matrix.length; i++) {
  //   for (let j = 0; j < matrix[i].length; j++) {
  //     matrix[i][j].distance = Infinity;
  //     matrix[i][j].isVisited = false;
  //   }
  // }
  for (const arr of matrix) {
    for (const node of arr) {
      node.distance = Infinity;
      node.isVisited = false;
    }
  }
}

function getValidNeighbors(matrix, node) {
  let neighbors = [];
  let row, col, neighbor;
  for (const dir of directions) {
    row = node.i + dir[0];
    col = node.j + dir[1];
    if (0 <= row && row <= 14 && 0 <= col && col <= 29) {
      neighbor = matrix[row][col];
      if (!neighbor.isVisited && !neighbor.isBlocked) {
        neighbors.push(neighbor);
      }
    }
  }
  return neighbors;
}

export function dijkstraAlgo(matrix, startRow, startCol, endRow, endCol) {
  resetProps(matrix);
  let visited = [];
  let source = matrix[startRow][startCol];
  source.distance = 0;
  let queue = [source];
  while (queue.length > 0) {
    let current = queue.shift();
    current.isVisited = true;
    visited.push(current);
    if (current.i == endRow && current.j == endCol) {
      return visited;
    }
    let neighbors = getValidNeighbors(matrix, current);
    for (const neighbor of neighbors) {
      if (neighbor.distance > current.distance + 1) {
        neighbor.distance = current.distance + 1;
        neighbor.previous = [current.i, current.j];
        queue.push(neighbor);
      }
    }
  }
  return [];
}
