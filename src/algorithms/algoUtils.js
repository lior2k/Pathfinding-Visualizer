import { startAndEndPositions, boardBoundaries } from "../utils/board";

export const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

export function resetProps(matrix) {
  for (const arr of matrix) {
    for (const node of arr) {
      node.distance = Infinity;
      node.isVisited = false;
    }
  }
}

export function getValidNeighbors(matrix, node) {
  let neighbors = [];
  let row, col, neighbor;
  for (const dir of directions) {
    row = node.i + dir[0];
    col = node.j + dir[1];
    if (
      row >= 0 &&
      row < boardBoundaries.rows &&
      col >= 0 &&
      col < boardBoundaries.cols
    ) {
      neighbor = matrix[row][col];
      if (!neighbor.isVisited && !neighbor.isBlocked) {
        neighbors.push(neighbor);
      }
    }
  }
  return neighbors;
}
