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
import { useState, useCallback } from "react";

function TopMenu({ board, updateNode, updateBoard }) {
  const [speedDropDown, setSpeedDropDown] = useState(false);
  const [speedText, setSpeedText] = useState("Fast");
  const [speed, setSpeed] = useState(20);

  function handleSpeedDropDown(speed, text) {
    setSpeed(speed);
    setSpeedText(text);
    setSpeedDropDown(false);
  }

  const [selectedAlgorithm, setSelectedAlgorithm] = useState(() => Dijkstra);
  const [visualizeButtonInnerText, setVisualizeButtonInnerText] =
    useState("Visualize Dijkstra");
  const [algorithmDropDown, setAlgorithmDropDown] = useState(false);

  function handleAlgorithmDropDown(innerText, algorithm) {
    setSelectedAlgorithm(algorithm);
    setVisualizeButtonInnerText(innerText);
    setAlgorithmDropDown(!algorithmDropDown);
  }

  const visualize = useCallback(() => {
    let tempBoard = deepCopyBoard(board);
    let visitedNodes = selectedAlgorithm(tempBoard);
    animateVisited(visitedNodes, updateNode, speed);
    animateShortestPath(tempBoard, updateNode, visitedNodes.length, speed);
  }, [selectedAlgorithm, speed, board]);

  return (
    <div className="top-menu">
      <button className="menu-button">Pathfinding Visualizer</button>

      <div className="dropdown">
        <button
          className="menu-button main-dropdown-button"
          onClick={() => {
            setAlgorithmDropDown(!algorithmDropDown);
          }}
        >
          Algorithms
          <span className="dropdown-arrow">&#9660;</span>
        </button>
        {algorithmDropDown && (
          <div className="dropdown-content">
            <button
              className="menu-button dropdown-button"
              onClick={() => {
                handleAlgorithmDropDown("Visualize Dijkstra", () => Dijkstra);
              }}
            >
              Dijkstra
            </button>
            <button
              className="menu-button dropdown-button"
              onClick={() => {
                handleAlgorithmDropDown("Visualize BFS", () => BFS);
              }}
            >
              BFS
            </button>
            <button
              className="menu-button dropdown-button"
              onClick={() => {
                handleAlgorithmDropDown("Visualize DFS", () => DFS);
              }}
            >
              Random DFS
            </button>
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

      <button
        className="menu-button special"
        onClick={() => {
          clearPathAndVisited(board, updateNode);
          visualize();
        }}
      >
        {visualizeButtonInnerText}
      </button>

      <button
        className="menu-button"
        onClick={() => {
          updateBoard(getInitialBoard());
        }}
      >
        Clear Board
      </button>

      <button
        className="menu-button"
        onClick={() => {
          clearWalls(board, updateNode);
        }}
      >
        Clear Walls
      </button>

      <button
        className="menu-button"
        onClick={() => {
          clearPathAndVisited(board, updateNode);
        }}
      >
        Clear Path
      </button>

      <div className="dropdown">
        <button
          className="menu-button main-dropdown-button"
          onClick={() => {
            setSpeedDropDown(!speedDropDown);
          }}
        >
          Speed: {speedText}
          <span className="dropdown-arrow">&#9660;</span>
        </button>

        {speedDropDown && (
          <div className="dropdown-content">
            <button
              className="menu-button dropdown-button"
              onClick={() => {
                handleSpeedDropDown(20, "Fast");
              }}
            >
              Fast
            </button>
            <button
              className="menu-button dropdown-button"
              onClick={() => {
                handleSpeedDropDown(60, "Average");
              }}
            >
              Average
            </button>
            <button
              className="menu-button dropdown-button"
              onClick={() => {
                handleSpeedDropDown(120, "Slow");
              }}
            >
              Slow
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TopMenu;
