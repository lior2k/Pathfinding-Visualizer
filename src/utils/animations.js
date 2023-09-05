import { startAndEndPositions } from "./board";

export function animateShortestPath(board, updateNode, extraTime, speed) {
    let endNode = board[startAndEndPositions.endRow][startAndEndPositions.endCol];
    if (endNode.distance === Infinity) {
        return;
    }
    let startNode =
        board[startAndEndPositions.startRow][startAndEndPositions.startCol];
    let current = board[startAndEndPositions.endRow][startAndEndPositions.endCol];
    let path = [];
    while (current != startNode) {
        path.unshift(current);
        current = board[current.previous[0]][current.previous[1]];
    }
    for (let i = 0; i < path.length; i++) {
        setTimeout(() => {
            path[i].isPath = true;
            path[i].isVisited = false;
            updateNode(path[i]);
        }, speed * (i + extraTime));
    }
}

export function animateVisited(visitedNodes, updateNode, speed) {
    for (let i = 0; i < visitedNodes.length; i++) {
        setTimeout(() => {
            updateNode(visitedNodes[i]);
        }, i * speed);
    }
}