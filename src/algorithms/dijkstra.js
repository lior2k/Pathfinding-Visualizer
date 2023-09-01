import { resetProps, directions } from "./algoUtils";

function initQueue(matrix) {
  let queue = [];
  for (const arr of matrix) {
    for (const node of arr) {
      if (!node.isBlocked) {
        queue.push(node);
      }
    }
  }
  return queue;
}

function updateNeighbors(matrix, node) {
  let row, col, neighbor;
  for (const dir of directions) {
    row = node.i + dir[0];
    col = node.j + dir[1];
    if (row >= 0 && row <= 14 && col >= 0 && col <= 29) {
      neighbor = matrix[row][col];
      if (!neighbor.isVisited && !neighbor.isBlocked) {
        neighbor.distance = node.distance + 1;
        neighbor.previous = [node.i, node.j];
      }
    }
  }
}

export function Dijkstra(matrix, startRow, startCol, endRow, endCol) {
  resetProps(matrix);
  let visited = [];
  matrix[startRow][startCol].distance = 0;
  let queue = initQueue(matrix);
  while (queue.length) {
    queue.sort((a, b) => a.distance - b.distance);
    let closest = queue.shift();
    closest.isVisited = true;
    visited.push(closest);
    if (closest.i == endRow && closest.j == endCol) {
      return visited;
    }
    updateNeighbors(matrix, closest);
  }
  return visited;
}
