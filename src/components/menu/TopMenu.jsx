import React from "react";
import "./TopMenu.css";
import { getInitialBoard } from "../../utils/board";
import { dijkstraAlgo } from "../../algorithms/dijkstra";

function animateShortestPath(board, updateBoard, extraTime) {
  let endPosition = board[7][29];
  let startingPosition = board[7][0];
  let current = endPosition;
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
  let visitedNodes = dijkstraAlgo(newBoard, 7, 0, 7, 29);
  if (visitedNodes.length) {
    animateVisited(visitedNodes, updateBoard);
    animateShortestPath(newBoard, updateBoard, visitedNodes.length);
  }
}

function TopMenu({ board, resetBoard, updateBoard }) {
  return (
    <div className="top-menu">
      <button>Algorithm</button>
      <button
        onClick={() => {
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
        Clear Board
      </button>
    </div>
  );
}

export default TopMenu;
