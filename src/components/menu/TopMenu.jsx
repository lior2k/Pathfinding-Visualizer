import React from "react";
import "./TopMenu.css";
import {
  startAndEndPositions,
  getInitialBoard,
  clearPathAndVisited,
  clearWalls,
} from "../../utils/board";
import { Dijkstra } from "../../algorithms/dijkstra";

function animateShortestPath(board, updateBoard, extraTime) {
  let startingPosition =
    board[startAndEndPositions.startRow][startAndEndPositions.startCol];
  let current = board[startAndEndPositions.endRow][startAndEndPositions.endCol];
  let path = [];
  while (current != startingPosition) {
    path.push(current);
    current = board[current.previous[0]][current.previous[1]];
  }
  path.reverse();
  for (let i = 0; i < path.length; i++) {
    setTimeout(() => {
      path[i].isPath = true;
      path[i].isVisited = false;
      updateBoard(path[i]);
    }, 20 * (i + extraTime));
  }
}

function animateVisited(visitedNodes, updateBoard) {
  for (let i = 0; i < visitedNodes.length; i++) {
    setTimeout(() => {
      updateBoard(visitedNodes[i]);
    }, i * 20);
  }
}

function visualizeDijkstra(board, updateBoard) {
  let newBoard = [];
  for (const arr of board) {
    let newRow = [];
    for (const node of arr) {
      let newNode = { ...node };
      newRow.push(newNode);
    }
    newBoard.push(newRow);
  }
  let visitedNodes = Dijkstra(newBoard, 7, 0, 7, 29);
  if (visitedNodes.length) {
    animateVisited(visitedNodes, updateBoard);
    animateShortestPath(newBoard, updateBoard, visitedNodes.length);
  }
}

function TopMenu({ board, resetBoard, updateBoard }) {
  return (
    <div className="top-menu">
      <button>Pathfinding Visualizer</button>
      <button>Algorithm</button>
      <button
        onClick={() => {
          clearPathAndVisited(board, updateBoard);
          visualizeDijkstra(board, updateBoard);
        }}
      >
        Visualize
      </button>
      <button
        onClick={() => {
          resetBoard(getInitialBoard());
        }}
      >
        Reset Board
      </button>
      <button
        onClick={() => {
          clearWalls(board, updateBoard);
        }}
      >
        Clear Walls
      </button>
      <button
        onClick={() => {
          clearPathAndVisited(board, updateBoard);
        }}
      >
        Clear Path
      </button>
    </div>
  );
}

export default TopMenu;
