import { resetProps, getValidNeighbors } from "./algoUtils";
import { startAndEndPositions } from "../utils/board";

export function BFS(matrix) {
  resetProps(matrix);
  let visited = [];
  let source =
    matrix[startAndEndPositions.startRow][startAndEndPositions.startCol];
  source.distance = 0;
  let queue = [source];
  while (queue.length > 0) {
    let current = queue.shift();
    current.isVisited = true;
    visited.push(current);
    if (
      current.i == startAndEndPositions.endRow &&
      current.j == startAndEndPositions.endCol
    ) {
      break;
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
  return visited;
}
