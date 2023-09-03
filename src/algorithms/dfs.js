import { resetProps, getValidNeighbors } from "./algoUtils";
import { startAndEndPositions } from "../utils/board";

let visitedNodesInOrder = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function DFS_Visit(matrix, current) {
    let neighbors = getValidNeighbors(matrix, current);
    neighbors = shuffleArray(neighbors);
    for (const neighbor of neighbors) {
        neighbor.distance = current.distance + 1;
        neighbor.isVisited = true;
        neighbor.previous = [current.i, current.j];
        visitedNodesInOrder.push(neighbor);
        DFS_Visit(matrix, neighbor);
    }
}

export function DFS(matrix) {
    resetProps(matrix);
    visitedNodesInOrder.length = 0;
    let source = matrix[startAndEndPositions.startRow][startAndEndPositions.startCol];
    source.distance = 0;
    source.isVisited = true;
    visitedNodesInOrder.push(source);
    DFS_Visit(matrix, source);
    return visitedNodesInOrder;
}
