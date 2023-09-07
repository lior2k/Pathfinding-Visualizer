import React from "react";
import "./TopMenu.css";
import {
  getInitialBoard,
  clearPathAndVisited,
  clearWalls,
} from "../../utils/board";
import { animateVisited, animateShortestPath } from "../../utils/animations";
import { createRecursiveMaze } from "../../utils/maze";
import { Dijkstra } from "../../algorithms/dijkstra";
import { BFS } from "../../algorithms/bfs";
import { DFS } from "../../algorithms/dfs";
import { useState } from "react";


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
  if (selectedAlgorithm === "Dijkstra") {
    visitedNodes = Dijkstra(newBoard);
  } else if (selectedAlgorithm === "BFS") {
    visitedNodes = BFS(newBoard);
  } else if (selectedAlgorithm === "DFS") {
    visitedNodes = DFS(newBoard);
  }

  animateVisited(visitedNodes, updateNode, speed);
  animateShortestPath(newBoard, updateNode, visitedNodes.length, speed);
}

function TopMenu({ board, updateNode, updateBoard }) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Dijkstra");
  const [speed, setSpeed] = useState(20);

  return (
    <div className="top-menu">
      <button className="menu-button">Pathfinding Visualizer</button>
      <select className="menu-button"
        onChange={(event) => {
          setSelectedAlgorithm(event.target.value);
        }}
      >
        <option value="Dijkstra">Dijkstra</option>
        <option value="BFS">BFS</option>
        <option value="DFS">Randomized DFS</option>
      </select>
      <button className="menu-button special"
        onClick={() => {
          clearPathAndVisited(board, updateNode);
          visualize(board, updateNode, selectedAlgorithm, speed);
        }}
      >
        Visualize {selectedAlgorithm}
      </button>
      <button className="menu-button"
        onClick={() => {
          updateBoard(getInitialBoard());
        }}
      >
        Reset Board
      </button>
      <button className="menu-button"
        onClick={() => {
          clearWalls(board, updateNode);
        }}
      >
        Clear Walls
      </button>
      <button className="menu-button"
        onClick={() => {
          clearPathAndVisited(board, updateNode);
        }}
      >
        Clear Path
      </button>
      <select className="menu-button"
        onChange={(event) => {
          setSpeed(event.target.value);
        }}
      >
        <option value={120}>Slow</option>
        <option value={60}>Average</option>
        <option value={20}>Fast</option>
      </select>

      <button
        className="menu-button"
        onClick={() => {
          // updateBoard(board = getInitialBoard());
          createRecursiveMaze(board, updateNode)
        }}
      >
        Recursive Maze
      </button>
    </div>
  );
}

export default TopMenu;
