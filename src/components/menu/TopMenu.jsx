import React from "react";
import "./TopMenu.css";
import {
  getInitialBoard,
  deepCopyBoard,
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
  let newBoard = deepCopyBoard(board);
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
  const [algorithmDropDown, setAlgorithmDropDown] = useState(false);

  function handleAlgorithmDropDown(algorithm) {
    setSelectedAlgorithm(algorithm);
    setAlgorithmDropDown(!algorithmDropDown);
  }

  const [speedDropDown, setSpeedDropDown] = useState(false);
  const [speedText, setSpeedText] = useState("Average");
  const [speed, setSpeed] = useState(20);

  function handleSpeedDropDown(speed, text) {
    setSpeed(speed);
    setSpeedText(text);
    setSpeedDropDown(false);
  }

  return (
    <div className="top-menu">
      <button className="menu-button">Pathfinding Visualizer</button>

      <div className="dropdown">
        <button className="menu-button main-dropdown-button"
          onClick={() => { setAlgorithmDropDown(!algorithmDropDown) }}>
          Algorithm: {selectedAlgorithm}
          <span className="dropdown-arrow">&#9660;</span>
        </button>
        {algorithmDropDown && (
          <div className="dropdown-content">
            <button className="menu-button dropdown-button" onClick={() => { handleAlgorithmDropDown("Dijkstra") }}>Dijkstra</button>
            <button className="menu-button dropdown-button" onClick={() => { handleAlgorithmDropDown("BFS") }}>BFS</button>
            <button className="menu-button dropdown-button" onClick={() => { handleAlgorithmDropDown("DFS") }}>Random DFS</button>
          </div>
        )}
      </div>

      <button
        className="menu-button"
        onClick={() => {
          clearWalls(board, updateNode);
          clearPathAndVisited(board, updateNode);
          createRecursiveMaze(deepCopyBoard(board), updateNode);
        }}
      >
        Recursive Division
      </button>

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
        Clear Board
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

      <div className="dropdown">
        <button className="menu-button main-dropdown-button"
          onClick={() => { setSpeedDropDown(!speedDropDown) }}>
          Speed: {speedText}
          <span className="dropdown-arrow">&#9660;</span>
        </button>

        {speedDropDown && (
          <div className="dropdown-content">
            <button className="menu-button dropdown-button" onClick={() => { handleSpeedDropDown(120, "Slow") }}>Slow</button>
            <button className="menu-button dropdown-button" onClick={() => { handleSpeedDropDown(60, "Average") }}>Average</button>
            <button className="menu-button dropdown-button" onClick={() => { handleSpeedDropDown(20, "Fast") }}>Fast</button>
          </div>
        )}
      </div>

    </div>
  );
}

export default TopMenu;
