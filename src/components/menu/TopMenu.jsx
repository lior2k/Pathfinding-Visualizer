import React from "react";
import "./TopMenu.css";
import { getInitialBoard } from "../../utils/board";
import { dijkstraAlgo } from "../../algorithms/dijkstra";

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
  animateVisited(visitedNodes, updateBoard);
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
