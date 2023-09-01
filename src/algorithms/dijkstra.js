import { resetProps, directions } from "./algoUtils";
import { startAndEndPositions } from "../utils/board";
import { boardBoundaries } from "../utils/board";

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
    if (
      row >= 0 &&
      row < boardBoundaries.rows &&
      col >= 0 &&
      col < boardBoundaries.cols
    ) {
      neighbor = matrix[row][col];
      if (!neighbor.isVisited && !neighbor.isBlocked) {
        neighbor.distance = node.distance + 1;
        neighbor.previous = [node.i, node.j];
      }
    }
  }
}

export function Dijkstra(matrix) {
  resetProps(matrix);
  let visited = [];
  matrix[startAndEndPositions.startRow][
    startAndEndPositions.startCol
  ].distance = 0;
  let queue = initQueue(matrix);
  while (queue.length) {
    queue.sort((a, b) => a.distance - b.distance);
    let closest = queue.shift();
    closest.isVisited = true;
    visited.push(closest);
    if (
      closest.i == startAndEndPositions.endRow &&
      closest.j == startAndEndPositions.endCol
    ) {
      return visited;
    }
    updateNeighbors(matrix, closest);
  }
  return visited;
}
