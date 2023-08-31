import { resetProps, getValidNeighbors } from "./algoUtils";

export function BFS(matrix, startRow, startCol, endRow, endCol) {
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
