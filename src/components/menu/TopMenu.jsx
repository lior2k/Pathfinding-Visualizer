import React from "react";
import "./TopMenu.css";
import {
  startAndEndPositions,
  getInitialBoard,
  clearPathAndVisited,
  clearWalls,
} from "../../utils/board";
import { Dijkstra } from "../../algorithms/dijkstra";
import { BFS } from "../../algorithms/bfs";
import { useState } from "react";

function animateShortestPath(board, updateNode, extraTime, speed) {
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

function animateVisited(visitedNodes, updateNode, speed) {
  for (let i = 0; i < visitedNodes.length; i++) {
    setTimeout(() => {
      updateNode(visitedNodes[i]);
    }, i * speed);
  }
}

function visualize(board, updateNode, selectedAlgorithm, speed) {
  let newBoard = [];
  for (const arr of board) {
    let newRow = [];
    for (const node of arr) {
      let newNode = { ...node };
      newRow.push(newNode);
    }
    newBoard.push(newRow);
  }
  let visitedNodes;
  if (selectedAlgorithm == "Dijkstra") {
    visitedNodes = Dijkstra(newBoard);
  } else if (selectedAlgorithm == "BFS") {
    visitedNodes = BFS(newBoard);
  }

  animateVisited(visitedNodes, updateNode, speed);
  animateShortestPath(newBoard, updateNode, visitedNodes.length, speed);
}

function TopMenu({ board, updateNode, updateBoard }) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Dijkstra");
  const [speed, setSpeed] = useState(20);

  return (
    <div className="top-menu">
      <button>Pathfinding Visualizer</button>
      <select
        onChange={(event) => {
          setSelectedAlgorithm(event.target.value);
        }}
      >
        <option value="Dijkstra">Dijkstra</option>
        <option value="BFS">BFS</option>
      </select>
      <button
        onClick={() => {
          clearPathAndVisited(board, updateNode);
          visualize(board, updateNode, selectedAlgorithm, speed);
        }}
      >
        Visualize {selectedAlgorithm}
      </button>
      <button
        onClick={() => {
          updateBoard(getInitialBoard());
        }}
      >
        Reset Board
      </button>
      <button
        onClick={() => {
          clearWalls(board, updateNode);
        }}
      >
        Clear Walls
      </button>
      <button
        onClick={() => {
          clearPathAndVisited(board, updateNode);
        }}
      >
        Clear Path
      </button>
      <select
        onChange={(event) => {
          setSpeed(event.target.value);
        }}
      >
        <option value={120}>Slow</option>
        <option value={60}>Average</option>
        <option value={20}>Fast</option>
      </select>

    </div>
  );
}

export default TopMenu;
